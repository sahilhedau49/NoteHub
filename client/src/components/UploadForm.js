import React, { useState } from "react";
import useStorage from "../Hooks/useStorage";
import Zoom from "react-reveal/Zoom";
import { FiAlertCircle } from "react-icons/fi";

const UploadForm = ({ room_id, uploaded_by }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [doc_name, setDoc_name] = useState();
  const [description, setDescription] = useState();
  const { uploadDocument, progress, added, setAdded } = useStorage();
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let size = selectedFile.size / 1000;
    if (size > 100000) {
      setError("Size of file should be less than 100MB.");
    }
    let t = selectedFile.type.split("/")[1];
    if (
      t === "pdf" ||
      t === "png" ||
      t === "jpeg" ||
      t === "jpg" ||
      t === "vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      t === "msword" ||
      t === "vnd.ms-powerpoint" ||
      t === "vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      setError("");
      uploadDocument({
        file: selectedFile,
        doc_name: doc_name,
        description: description,
        room_id: room_id,
        uploaded_by: uploaded_by,
      });
      setTimeout(() => setAdded(false), 10000);
    } else {
      setError("Supported file types are pdf, png, docx, doc, pptx and ppt.");
    }
  };

  return (
    <div className="text-center mt-12">
      <form onSubmit={handleSubmit} className="mx-auto text-center">
        <div>
          <input
            onChange={handleFileChange}
            type="file"
            required
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label>Document Name</label>
          <input
            type="text"
            required
            onChange={(e) => {
              setDoc_name(e.target.value);
            }}
            placeholder="Document Name"
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Describe about document content/purpose"
          />
        </div>
        <div>
          <button className="btn w-fit mt-3" type="submit">
            Submit
          </button>
        </div>
        {/* <div className="flex gap-3 justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            name="public"
            className={`btn w-fit mt-3`}
            disabled={!selectedFile}
          >
            Upload Public
          </button>
          <span className={`mt-3 ${Boolean(progress) && "loading"}`}></span>
          <button
            type="submit"
            onClick={handleSubmit}
            name="private"
            className={`btn w-fit mt-3`}
            disabled={!selectedFile}
          >
            Upload Private
          </button>
        </div> */}
        <span className={`mt-3 ${Boolean(progress) && "loading"}`}></span>
        {added && (
          <Zoom left>
            <div>
              <div className="w-fit text-lg mx-auto my-5 px-3 bg-green-500 rounded-full text-center text-slate-200 ">
                Success ✅
              </div>
            </div>
          </Zoom>
        )}
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
