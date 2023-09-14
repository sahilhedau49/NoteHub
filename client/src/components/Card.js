import React, { useEffect, useState } from "react";
import pdf from "../images/pdf.png";
import png from "../images/jpg.jpeg";
import doc from "../images/doc.jpeg";
import ppt from "../images/ppt.jpeg";

const Card = ({ url, name, createdAt, email }) => {
  const type = name.split(".")[1];
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    if (type === "pdf") {
      setImgUrl(pdf);
    } else if (type === "doc" || type === "docx") {
      setImgUrl(doc);
    } else if (type === "png" || type === "jpeg") {
      setImgUrl(png);
    } else {
      setImgUrl(ppt);
    }
  }, [type]);

  return (
    <div>
      <a href={url} target="_blank" rel="noreferrer">
        <div className="card card-compact w-[100%] bg-base-100 shadow-xl sm:w-[100%]">
          <p className="mt-4 px-4 mb-4 text-lg text-center font-bold">{name}</p>
          <figure>
            <img className="w-28 rounded-full" src={imgUrl} alt="Doc-Type" />
          </figure>
          <div className="card-body">
            <p className="text-base">
              <span className="font-semibold">Uploaded By:</span> {email}
            </p>
            <p className="text-base">
              <span className="font-semibold">Created On:</span>{" "}
              {createdAt.toLocaleDateString()}
            </p>
          </div>
          <div className="absolute bottom-1 right-1">
            <button className="px-2 py-1 bg-slate-300 text-black rounded-br-xl w-fit justify-center">
              Delete
            </button>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
