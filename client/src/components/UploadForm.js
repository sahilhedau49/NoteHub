import React, { useState } from "react";
import useStorage from "../Hooks/useStorage";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState();
  const { startUpload } = useStorage();
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    startUpload(selectedFile);
    // console.log(selectedFile);
  };

  return (
    <div className="text-center mt-20">
      <form onSubmit={handleSubmit} className="mx-auto text-center">
        <input
          onChange={handleFileChange}
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <br />
        <button type="submit" className="btn w-24 mt-3">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
