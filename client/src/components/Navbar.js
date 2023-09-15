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
        <Link className="font-bold normal-case text-xl">NoteHub</Link>
        <div className="flex gap-4">
          <button onClick={handleSignOut} className="btn">
            Sign Out
          </button>
          {user.email && (
            <p className="font-semibold text-lg">{user.email.split("@")[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
