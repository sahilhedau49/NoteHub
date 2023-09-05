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
      <div className="shadow-lg rounded-b-lg px-4 shadow-slate-800 drop-shadow-xl/10000 justify-between navbar bg-base-100">
        <Link className="font-bold normal-case text-xl">NoteHub</Link>
        <button onClick={handleSignOut} className="btn">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
