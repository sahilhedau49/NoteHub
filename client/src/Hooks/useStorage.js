import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";
import { useState } from "react";

const useStorage = () => {
  const [progress, setProgress] = useState();
  const [url, setUrl] = useState("");
  const [err, setErr] = useState("");

  const startUpload = (file) => {
    if (!file) {
      return;
    }
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // console.log(uploadTask);
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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
          setProgress(0);
        });
      }
    );
  };

  return {
    startUpload,
    progress,
    url,
    err,
  };
};

export default useStorage;
