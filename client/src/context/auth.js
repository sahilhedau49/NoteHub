import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [errWhileSign, setErrWhileSign] = useState("");
  const [errWhileLog, setErrWhileLog] = useState("");

  const emailSignIn = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log(error);
      setErrWhileSign(error);
    });
  };

  const emailLogIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log(error);
      setErrWhileLog(error);
    });
  };

  const SignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        emailSignIn,
        emailLogIn,
        SignOut,
        user,
        errWhileSign,
        errWhileLog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
