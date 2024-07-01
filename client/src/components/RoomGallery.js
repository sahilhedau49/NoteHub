import React, { useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/auth";
import axios from "axios";
import { useParams } from "react-router-dom";
import UploadForm from "./UploadForm";
import { FaPlus, FaTimes } from "react-icons/fa";
import Card from "./Card";

const RoomGallery = () => {
  const [documents, setDocuments] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = UserAuth();
  const { room_id } = useParams();
  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsFormOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (user.email) {
        try {
          const username = user.email.split("@")[0];
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/getDocuments/${room_id}/${username}`
          );
          console.log(res);
          setDocuments(res.data.documents);
          setIsAdmin(res.data.isAdmin);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const fetchRoomDetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/getRoomDetails/${room_id}`
        );
        console.log(res);
        setRoomDetails(res.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocuments();
    fetchRoomDetails();
  }, [user]);

  return (
    <>
      {roomDetails ? (
        <div className="w-[80%] mx-auto min-h-[90vh]">
          <div className="mt-10">
            <div className="flex justify-between">
              <h1 className="text-4xl mb-3 font-semibold">
                {roomDetails.room_name}
              </h1>
              <h1 className="place-content-center text-xl">
                <span className="font-medium text-zinc-600">Room code: </span>
                {room_id}
              </h1>
            </div>
            <h2 className="text-2xl font-medium text-zinc-500">
              {roomDetails.room_description}
            </h2>
          </div>
          {isFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div ref={modalRef}>
                <UploadForm
                  room_id={room_id}
                  uploaded_by={user?.email?.split("@")[0]}
                />
              </div>
            </div>
          )}
          <div>
            <div>
              {documents.length !== 0 && documents.map((doc) => <Card />)}
            </div>
          </div>
          {isAdmin && (
            <div className="fixed bottom-8 right-8">
              {isFormOpen ? (
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="bg-zinc-800 h-16 w-16 hover:bg-zinc-600 duration-200 text-white font-bold rounded-full shadow-lg text-3xl"
                >
                  <FaTimes className="mx-auto" />
                </button>
              ) : (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-zinc-800 h-16 w-16 hover:bg-zinc-600 duration-200 text-white font-bold rounded-full shadow-lg text-3xl"
                >
                  <FaPlus className="mx-auto" />
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>not found</div>
      )}
    </>
  );
};

export default RoomGallery;
