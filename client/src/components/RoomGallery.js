import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/auth";
import axios from "axios";
import { useParams } from "react-router-dom";
import UploadForm from "./UploadForm";

const RoomGallery = () => {
  const [documents, setDocuments] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
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
        <div>
          <div>
            <h1>{roomDetails.room_name}</h1>
            <h2>{roomDetails.room_description}</h2>
          </div>
          {isAdmin && <UploadForm />}
          <div>
            <div>
              {documents.length !== 0 &&
                documents.map((doc) => (
                  <div key={doc.doc_id}>
                    <a href={`${doc.url}`} target="_blank">
                      LINK
                    </a>
                  </div> // redesign card component
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div>not found</div>
      )}
    </>
  );
};

export default RoomGallery;
