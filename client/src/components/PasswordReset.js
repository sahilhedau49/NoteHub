import React, { useState } from "react";
import { UserAuth } from "../context/auth";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(false);
  const [err, setErr] = useState("");
  const { sendPasswordReset, passreseterr } = UserAuth();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (email == "") {
      setErr("Please provide email");
    } else {
      try {
        sendPasswordReset(email);
        setMsg(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content flex-col w-[40%] lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-4">Password Reset</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-6">
                <button
                  className="btn btn-primary w-fit mx-auto"
                  onClick={handleSubmit}
                >
                  Send Password Reset Mail
                </button>
              </div>

              <Link
                className="block underline text-lg mt-2 text-center"
                to="/login"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
      {msg && (
        <div className="absolute mt-4 bottom-0 z-20 rounded-none alert alert-success">
          Password reset link is sent to your mail. Please use it to reset your
          password. Once done, Login Again.
        </div>
      )}
      {err && (
        <div className="absolute mt-4 bottom-0 rounded-none alert alert-error">
          {err}
        </div>
      )}
      {passreseterr && (
        <div className="absolute z-10 mt-4 bottom-0 rounded-none alert alert-error">
          {passreseterr.message}
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
