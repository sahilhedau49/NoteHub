import React, { useEffect, useState } from "react";
import pdf from "../images/pdf.png";
import png from "../images/jpg.jpeg";
import doc from "../images/doc.jpeg";
import ppt from "../images/ppt.jpeg";
import useFirestore from "../Hooks/useFirestore";
import { UserAuth } from "../context/auth";

const Card = ({ docType, dataKey, url, name, createdAt, email }) => {
  const type = name.split(".")[1];
  const [imgUrl, setImgUrl] = useState();
  const { handleDocDelete, noDelError, setNoDelError } = useFirestore();
  const [modal, setModal] = useState(false);
  const { setModalStatus } = UserAuth();

  const handleDelete = () => {
    setModal(true);
    setModalStatus(true);
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
            className="px-2 py-1 bg-slate-300 text-black rounded-br-xl w-fit justify-center hover:bg-slate-400 duration-200"
          >
            Delete
          </button>
        </div>
      </div>
      {noDelError && (
        <div className="w-80 z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-2xl bg-slate-300">
          <p className="text-2xl font-semibold text-center">
            You are not owner of this document. So you{" "}
            <span className="text-red-600 font-semibold">can't delete</span> it.
          </p>
          <div className="flex gap-4 justify-around mt-4">
            <button
              onClick={() => {
                setNoDelError(false);
              }}
              className="btn border-none px-10"
            >
              OK
            </button>
          </div>
        </div>
      )}
      {modal && (
        <div className="z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-2xl bg-slate-300">
          <p className="text-2xl font-semibold">Do you want to delete ?</p>
          <div className="flex gap-4 justify-around mt-4">
            <button
              onClick={() => {
                setModal(false);
                setModalStatus(false);
              }}
              className="btn border-none"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDocDelete(dataKey, email, docType);
                setModal(false);
                setModalStatus(false);
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
