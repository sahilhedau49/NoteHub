import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserAuth } from "../context/auth";
import { Link } from "react-router-dom";

const MyRooms = () => {
  const [myRooms, setMyRooms] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user.email) {
        try {
          const username = user.email.split("@")[0];
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/getRoomsForMember/${username}`
          );
          console.log(res);
          setMyRooms(res.data.rooms);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="w-[80%] mx-auto mt-20">
      <div className="text-4xl font-medium text-center mb-10">My Rooms</div>

      {myRooms?.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {myRooms.map((room) => (
            <div key={room.room_id} className="card bg-zinc-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{room.room_name}</h2>
                <p>{room.room_description.substr(0, 120)} ...</p>
                <p>{room.room_id}</p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/room/${room.room_id}`}
                    className="px-4 py-2 bg-zinc-600 text-zinc-100 rounded-md"
                  >
                    Enter
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="w-full text-4xl text-center font-semibold text-zinc-400">
          You have not joined any room yet...
        </h2>
      )}
    </div>
  );
};

export default MyRooms;
