import React, { useState } from "react";
import { UserAuth } from "../context/auth";
import { Link } from "react-router-dom";
import ErrorSign from "./ErrorSign";

const Signup = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { emailSignIn, errWhileSign, isValidate } = UserAuth();

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
    <>
      <div>
        <p className="absolute top-6 left-1/2 -translate-x-1/2 italic font-extrabold text-[4rem] sm:text-6xl sm:top-10">
          NoteHub
        </p>
      </div>
      <form>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col sm:w-screen sm:px-4">
            <div className="text-center">
              <h1 className="text-5xl font-bold">Sign Up</h1>
              <p className="py-6">Share your notes with the world 📖💫🌈</p>
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
      {isValidate && (
        <p>Your email is verified successfully. Please Log in now.</p>
      )}
      {errWhileSign && <ErrorSign />}
    </>
  );
};

export default Signup;
