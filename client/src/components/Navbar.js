import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/auth";

const Navbar = () => {
  const { SignOut } = UserAuth();

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
        <button onClick={handleSignOut} className="btn">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
