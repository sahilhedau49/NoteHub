import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { db, storage } from "../Firebase";
import { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { UserAuth } from "../context/auth";
import { v4 as uuidv4 } from "uuid";

const useStorage = () => {
  const [progress, setProgress] = useState();
  const [err, setErr] = useState("");
  const { user } = UserAuth();
  const [added, setAdded] = useState(false);

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

  return {
    startUpload,
    progress,
    err,
    added,
  };
};

export default useStorage;
