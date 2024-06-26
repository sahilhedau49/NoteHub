import { React, useState } from "react";
import { UserAuth } from "../context/auth";

const CreateRoom = () => {
  const { user } = UserAuth();
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateRoom = async (e) => {};

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-5 text-center">Create Room</h2>
      <form onSubmit={handleCreateRoom}>
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
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
