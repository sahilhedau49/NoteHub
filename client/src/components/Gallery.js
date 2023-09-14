import React, { useEffect, useState } from "react";
import useFirestore from "../Hooks/useFirestore";
import Card from "./Card";

const Gallery = () => {
  const { res, isLoading, getData } = useFirestore();
  const [data, setData] = useState("public");

  useEffect(() => {
    getData(data);
  }, [data]);
  console.log(res);

  return (
    <div className="max-w-fit min-h-screen mx-auto pb-6">
      <div className="mt-12 text-center">
        {isLoading && <progress className="progress w-56"></progress>}
      </div>
      <div className="flex mt-4 gap-3 justify-center">
        <button
          onClick={(e) => {
            setData(e.target.name);
          }}
          name="public"
          className={`btn w-fit ${
            data === "public" && "bg-slate-800 text-slate-50 hover:text-black"
          }`}
        >
          Show Public
        </button>
        <button
          onClick={(e) => {
            setData(e.target.name);
          }}
          name="private"
          className={`btn w-fit ${
            data === "private" && "bg-slate-800 text-slate-50 hover:text-black"
          }`}
        >
          Show Private
        </button>
      </div>
      <div className="coin-main grid grid-cols-3 gap-x-12 lg:grid-cols-3 sm:grid-cols-1 gap-y-24 md:gap-y-8 p-20 lg:p-8">
        {res.map((doc) => {
          return (
            <Card
              key={doc.url}
              desc={doc.desc}
              name={doc.name}
              url={doc.url}
              createdAt={doc.createdAt}
              email={doc.gmail}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
