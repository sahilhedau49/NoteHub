import React from "react";
import UploadForm from "./UploadForm";
import Navbar from "./Navbar";
import Gallery from "./Gallery";
import Footer from "./Footer";
import Rooms from "./Rooms";

const Home = () => {
  return (
    <div className="bg-zinc-200 mx-auto min-h-screen overflow-x-hidden">
      <Navbar />
      <Rooms />
      {/* <UploadForm />
      <Gallery /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
