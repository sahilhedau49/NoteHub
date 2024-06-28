import React, { useState } from "react";
import { UserAuth } from "../context/auth";
import { Link } from "react-router-dom";
import ErrorSign from "./ErrorSign";

const Signup = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { veriMsg, emailSignIn, errWhileSign } = UserAuth();

  const getData = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailSignIn(data.email, data.password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overflow-y-hidden min-h-[90vh] mt-10 flex place-content-center">
      <form>
        <div className="hero">
          <div className="hero-content flex-col sm:w-screen sm:px-4">
            <div className="text-center">
              <h1 className="text-5xl font-bold">Sign Up</h1>
              <p className="py-6">Share your notes with the world 📖💫</p>
            </div>
            <div className="card w-[30rem] shadow-2xl bg-base-100 sm:w-[90%]">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    onChange={getData}
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Create Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={getData}
                    placeholder="password"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-6">
                  <button onClick={handleSubmit} className="btn btn-primary">
                    Sign Up
                  </button>
                  <Link
                    className="underline mt-2 text-xs text-center"
                    to="/login"
                  >
                    Already have an account? Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {errWhileSign && !veriMsg && <ErrorSign />}
      {veriMsg && (
        <div className="fixed mt-4 bottom-0 rounded-none alert alert-success">
          Verification link is sent to your mail. Please verify it and reload
          this page.
        </div>
      )}
    </div>
  );
};

export default Signup;
