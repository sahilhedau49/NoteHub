import React from "react";
import useFirestore from "../Hooks/useFirestore";
import Card from "./Card";

const Gallery = () => {
  const { res, isLoading } = useFirestore();
  console.log(res);

  return (
    <>
      <div className="mt-6 text-center">
        {isLoading && <progress className="progress w-56"></progress>}
      </div>
      <div className="coin-main grid grid-cols-2 gap-x-12 lg:grid-cols-2 sm:grid-cols-1 gap-y-24 md:gap-y-8 p-20 lg:p-8 sm:p-8 ">
        {res.map((doc) => {
          return (
            <Card
              key={doc.url}
              url={doc.url}
              createdAt={doc.createdAt}
              email={doc.gmail}
            />
          );
        })}
      </div>
    </>
  );
};

export default Gallery;
