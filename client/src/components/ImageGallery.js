import React from "react";

const ImageGallery = () => {
  return (
    <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="" alt="Shoes" />
        </figure>
        <div className="card-body">
          <p>Uploaded By: </p>
          <p>Created On: </p>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
