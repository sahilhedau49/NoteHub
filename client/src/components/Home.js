import React from "react";
import UploadForm from "./UploadForm";
import Navbar from "./Navbar";
import ImageGallery from "./ImageGallery";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <UploadForm />
      <ImageGallery />
    </div>
  );
};

export default Home;
