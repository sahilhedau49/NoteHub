import { React, useState } from "react";
import { UserAuth } from "../context/auth";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CreateRoom = () => {
  const { user } = UserAuth();
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");

  const generateRoomId = () => {
    return uuidv4().replace(/-/g, "").substring(0, 6);
  };

  const handleCreateRoom = async (e) => {
    const roomID = generateRoomId();
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/createRoom`,
      {
        room_name: roomName,
        room_description: description,
        admin_email: user.email,
        room_id: roomID,
      }
    );
    console.log(res);
    // toast on res.data.message
    setRoomName("");
    setDescription("");
  };

  return (
    <div className="min-h-[90vh] flex place-items-center">
      <div className="w-[36%] mx-auto p-10 bg-zinc-100 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-5 text-center">Create Room</h2>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Room Name:
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <button
            onClick={handleCreateRoom}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
