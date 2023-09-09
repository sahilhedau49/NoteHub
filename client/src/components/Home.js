import React from "react";
import UploadForm from "./UploadForm";
import Navbar from "./Navbar";
import Gallery from "./Gallery";

const Home = () => {
  return (
    <div className="bg-zinc-200 mx-auto min-h-screen">
      <Navbar />
      <UploadForm />
      <Gallery />
    </div>
  );
};

export default Home;
