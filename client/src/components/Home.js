import React from "react";
import UploadForm from "./UploadForm";
import Navbar from "./Navbar";
import Gallery from "./Gallery";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="bg-zinc-200 mx-auto min-h-screen overflow-x-hidden">
      <Navbar />
      <UploadForm />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Home;
