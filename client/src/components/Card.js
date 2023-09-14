import React, { useEffect, useState } from "react";
import pdf from "../images/pdf.png";
import png from "../images/jpg.jpeg";
import doc from "../images/doc.jpeg";
import ppt from "../images/ppt.jpeg";
import useFirestore from "../Hooks/useFirestore";

const Card = ({ docType, dataKey, url, name, createdAt, email }) => {
  const type = name.split(".")[1];
  const [imgUrl, setImgUrl] = useState();
  const { handleDocDelete } = useFirestore();
  const [modal, setModal] = useState(false);

  const handleDelete = () => {
    setModal(true);
  };

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
      <div className="card card-compact w-[100%] bg-base-100 shadow-xl sm:w-[100%]">
        <a href={url} target="_blank" rel="noreferrer">
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
        </a>
        <div className="absolute bottom-1 right-1">
          <button
            onClick={handleDelete}
            className="px-2 py-1 bg-slate-300 text-black rounded-br-xl w-fit justify-center"
          >
            Delete
          </button>
        </div>
      </div>
      {modal && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-2xl bg-slate-300">
          <p className="text-2xl font-semibold">Do you want to delete ?</p>
          <div className="flex gap-4 justify-around mt-4">
            <button onClick={() => setModal(false)} className="btn border-none">
              Cancel
            </button>
            <button
              onClick={() => {
                handleDocDelete(dataKey, email, docType);
                setModal(false);
              }}
              className="btn bg-red-600 text-white border-none hover:text-black"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
