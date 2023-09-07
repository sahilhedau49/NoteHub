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
  const [err, setErr] = useState("");

  const emailSignIn = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log(error);
      setErr(error);
    });
  };

  const emailLogIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
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
      value={{ emailSignIn, emailLogIn, SignOut, user, err }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
