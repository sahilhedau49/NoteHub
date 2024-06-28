import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/auth";

const Navbar = () => {
  const { SignOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await SignOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="border-b-2 border-black px-40 py-4 justify-between navbar sm:px-4">
        <Link to={"/"} className="font-bold normal-case text-xl">
          NoteHub
        </Link>
        <div className="flex gap-6">
          {user && user.email && (
            <p className="font-semibold text-lg">{user.email.split("@")[0]}</p>
          )}
          <button
            onClick={handleSignOut}
            className="py-3 px-4 bg-zinc-100 rounded-xl hover:bg-zinc-800 duration-200 hover:text-zinc-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
