import React, { useState } from "react";
import useStorage from "../Hooks/useStorage";
import Zoom from "react-reveal/Zoom";
import { FiAlertCircle } from "react-icons/fi";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState();
  const { startUpload, progress, url } = useStorage();
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let t = selectedFile.type.split("/")[1];
    if (
      t === "pdf" ||
      t === "png" ||
      t === "vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setError("");
      startUpload(selectedFile);
    } else {
      setError("File should be only of type pdf or png.");
    }
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
        <div className="flex justify-center">
          <button
            type="submit"
            className={`btn w-24 mt-3 ${Boolean(progress) && "loading"}`}
            disabled={!selectedFile}
          >
            Upload
          </button>
          {url && (
            <Zoom left>
              <div>
                <div className="mx-auto my-5 px-3  text-2xl text-center text-slate-200 ">
                  ✅
                </div>
              </div>
            </Zoom>
          )}
        </div>
        {error && (
          <div className="alert alert-error max-w-fit px-4 mx-auto py-2 mt-2">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadForm;
