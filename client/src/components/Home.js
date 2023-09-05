import React from "react";
import UploadForm from "./UploadForm";
import Navbar from "./Navbar";
import Gallery from "./Gallery";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <UploadForm />
      <Gallery />
    </div>
  );
};

export default Home;
