import React, { useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/auth";
import axios from "axios";
import { useParams } from "react-router-dom";
import UploadForm from "./UploadForm";
import { FaPlus, FaTimes } from "react-icons/fa";
import DocCard from "./DocCard";

const RoomGallery = () => {
  const [documents, setDocuments] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = UserAuth();
  const { room_id } = useParams();
  const modalRef = useRef(null);
  const [addAdminModal, setAddAdminModal] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [addNewAdminRes, setAddNewAdminRes] = useState("");

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsFormOpen(false);
      setAddAdminModal(false);
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

  const handleAddNewAdmin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/addNewAuthor`,
        {
          admin_name: newAdminEmail.split("@")[0],
          admin_email: newAdminEmail,
          room_id: room_id,
        }
      );
      console.log(res);
      setAddNewAdminRes(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {roomDetails ? (
        <div className="w-[80%] mx-auto min-h-[90vh]">
          <div className="mt-10">
            <div className="flex justify-between">
              <h1 className="text-4xl mb-3 font-semibold">
                {roomDetails.room_name}
              </h1>
              {isAdmin && (
                <h1 className="place-content-center text-xl">
                  <span className="font-medium text-zinc-600">Room code: </span>
                  {room_id}
                </h1>
              )}
            </div>
            <div className="flex justify-between">
              <h2 className="text-2xl font-medium text-zinc-500">
                {roomDetails.room_description}
              </h2>
              {isAdmin && (
                <button
                  onClick={() => setAddAdminModal(true)}
                  className="px-6 py-2 text-lg font-medium border-2 border-zinc-700 bg-zinc-300 rounded-lg"
                >
                  Add new editor
                </button>
              )}
            </div>
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
          <div className="mt-10">
            <div className="grid grid-cols-3 gap-4">
              {documents.length !== 0 &&
                documents.map((doc) => (
                  <DocCard key={doc.doc_id} data={doc} isAdmin={isAdmin} />
                ))}
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
      {addAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div ref={modalRef} className="bg-slate-200 p-8 rounded-md">
            <div className="flex flex-col">
              <div>
                <h1 className="text-2xl font-medium text-zinc-800">
                  Enter editor email
                </h1>
                <input
                  onChange={(e) => {
                    setNewAdminEmail(e.target.value);
                  }}
                  className="w-80 mt-2 rounded-md outline-none px-4 py-2 border-2 border-zinc-400 focus:border-zinc-700"
                  type="email"
                  required
                />
              </div>
              <button
                onClick={handleAddNewAdmin}
                className="mt-6 mx-auto w-fit bg-zinc-800 text-zinc-100 px-10 py-2 texxl font-medium rounded-md"
              >
                Add
              </button>
              {addNewAdminRes !== "" && (
                <h1 className="mt-6 px-4 py-2 rounded-md bg-green-400">
                  ✅ {addNewAdminRes}
                </h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomGallery;
