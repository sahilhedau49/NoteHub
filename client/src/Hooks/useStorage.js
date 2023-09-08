import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../Firebase";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { UserAuth } from "../context/auth";

const useStorage = () => {
  const [progress, setProgress] = useState();
  const [err, setErr] = useState("");
  const { user } = UserAuth();
  const [added, setAdded] = useState(false);

  const startUpload = (file) => {
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
        setProgress(0);
        try {
          await addDoc(collection(db, "documents"), {
            docUrl: url,
            createdAt: new Date(),
            ownerEmail: user.email,
          });
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
