import React from "react";

const UploadForm = () => {
  return (
    <div className="text-center mt-10">
      <form className="mx-auto text-center">
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <br />
        <button className="btn w-24 mt-3">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
