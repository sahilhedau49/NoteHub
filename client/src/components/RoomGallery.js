import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/auth";
import axios from "axios";
import { useParams } from "react-router-dom";
import UploadForm from "./UploadForm";

const RoomGallery = () => {
  const [documents, setDocuments] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  const { user } = UserAuth();
  const { room_id } = useParams();

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
    <div>
      <div>
        <h1>{roomDetails.room_name}</h1>
        <h2>{roomDetails.room_description}</h2>
      </div>
      <UploadForm />
      <div>
        <div>
          {documents.map((doc) => (
            <div key={doc.doc_id}></div> // redesign card component
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomGallery;
