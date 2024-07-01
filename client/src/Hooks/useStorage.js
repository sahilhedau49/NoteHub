import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../Firebase";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  setDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/auth";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const useStorage = () => {
  const [progress, setProgress] = useState();
  const [err, setErr] = useState("");
  const { user } = UserAuth();
  const [added, setAdded] = useState(false);
  const [limitErr, setLimitErr] = useState("");

  const uploadDocument = (data) => {
    if (!data.file || !data.doc_name || !data.description) {
      return;
    }
    const storageRef = ref(storage, "documents-v2/" + data.file.name);
    const uploadTask = uploadBytesResumable(storageRef, data.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        setErr(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        // const metaData = await getMetadata(storageRef);
        setProgress(0);

        try {
          // console.log(data);
          // console.log(url, metaData);
          const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/addDocumentInRoom`,
            {
              room_id: data.room_id,
              doc_name: data.doc_name,
              description: data.description,
              uploaded_by: data.uploaded_by,
              url: url,
            }
          );
          console.log(res);
          setAdded(true);
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  const startUpload = (file, access) => {
    if (!file) {
      return;
    }
    const storageRef = ref(storage, "documents/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        setErr(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const metaData = await getMetadata(storageRef);
        setProgress(0);
        const username = user.email.split("@")[0];
        try {
          if (access === "public") {
            await addDoc(collection(db, "publicData"), {
              name: metaData.name,
              docUrl: url,
              createdAt: new Date(),
              ownerEmail: user.email,
            });
          } else {
            const coll = collection(db, "privateData", `${username}`, "data");
            const snapshot = await getCountFromServer(coll);

            if (snapshot.data().count === 5) {
              console.log("Limit reached...");
              setLimitErr(
                "Limit Reached, you can only upload upto 5 documents for private."
              );
              return;
            }

            const docId = uuidv4();
            await setDoc(
              doc(db, "privateData", `${username}`, "data", `${docId}`),
              {
                name: metaData.name,
                docUrl: url,
                createdAt: new Date(),
                ownerEmail: user.email,
              }
            );
          }
          setAdded(true);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    );
  };

  const deleteFile = (name) => {
    console.log("Delete Here...");
    const docRef = ref(storage, `documents/${name}`);
    try {
      deleteObject(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    startUpload,
    progress,
    err,
    added,
    setAdded,
    deleteFile,
    limitErr,
    uploadDocument,
  };
};

export default useStorage;
