import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/auth";

const Rooms = () => {
  const navigate = useNavigate();
  const [roomcode, setRoomcode] = useState("");
  const [myRooms, setMyRooms] = useState([1, 1, 1, 1]);
  const { user } = UserAuth();

  const handleCodeChange = (e) => {
    setRoomcode(e.target.value);
  };

  const findRoomAndJoin = () => {
    // findRoomNJoin(roomcode, user.email.split("@")[0]);
    console.log("Finding room with code: ", roomcode);
  };

  const handleCreateRoom = () => {
    navigate("/createRoom");
  };

  useEffect(() => {
    console.log("Fetch My Rooms");
  }, []);

  return (
    <div className="pt-20">
      <div className="w-[80%] mx-auto justify-center flex gap-6">
        <div className="w-[40%] px-10 py-6 bg-gray-300 rounded-xl border-2 border-gray-600">
          <h1 className="mb-6 text-4xl it font-medium">Join a room</h1>
          <div className="text-2xl">
            <h1 className="mb-2">Enter room code:</h1>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Room Code"
                onChange={handleCodeChange}
                className="w-[16rem] px-3 py-1 rounded-md outline-none border-2 border-gray-600"
              />
              <button
                onClick={findRoomAndJoin}
                disabled={roomcode.length !== 6}
                className="text-gray-200 px-6 py-1 disabled:cursor-not-allowed rounded-md border-2 border-gray-800 bg-gray-800 hover:bg-gray-400 hover:text-gray-900 duration-300"
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleCreateRoom}
          className="flex text-center cursor-pointer flex-col justify-center w-[40%] px-10 py-6 bg-gray-300 rounded-xl border-2 border-gray-600"
        >
          <h1 className="block mx-auto text-4xl it font-medium">
            Create your room
          </h1>
        </button>
      </div>
      <div className="w-[80%] mx-auto mt-20">
        <div className="text-4xl font-medium text-center mb-10">My Rooms</div>
        <div className="grid grid-cols-3 gap-6">
          {myRooms.map((room) => (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
