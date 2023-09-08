import React from "react";

const Card = ({ url, createdAt, email }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            className="w-20"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
            alt="PDF Img"
          />
        </figure>
        <div className="card-body">
          <p>
            <span className="font-semibold">Uploaded By:</span> {email}
          </p>
          <p>
            <span className="font-semibold">Created On:</span>{" "}
            {createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </a>
  );
};

export default Card;
