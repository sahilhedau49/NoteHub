import React, { useState } from "react";
import { UserAuth } from "../context/auth";
import { Link } from "react-router-dom";
import ErrorLog from "./ErrorLog";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { emailLogIn, errWhileLog } = UserAuth();

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
      await emailLogIn(data.email, data.password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overflow-y-hidden">
      <div>
        <p className="absolute top-6 left-1/2 -translate-x-1/2 italic font-extrabold text-[4rem] sm:text-6xl sm:top-10">
          NoteHub
        </p>
      </div>
      <form>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col sm:w-screen sm:px-4">
            <div className="text-center">
              <h1 className="text-5xl font-bold">Log In</h1>
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
                    <span className="label-text">Password</span>
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
                    Log In
                  </button>
                  <div>
                    <Link
                      className="block underline mt-2 text-xs text-right"
                      to="/passwordreset"
                    >
                      Forgot Password
                    </Link>
                  </div>
                  <Link
                    className="underline mt-4 text-xs text-center"
                    to="/signup"
                  >
                    Don't have an account? Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {errWhileLog && <ErrorLog />}
    </div>
  );
};

export default Login;
