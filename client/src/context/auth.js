import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isValidate, setIsValidate] = useState(false);
  const [errWhileSign, setErrWhileSign] = useState("");
  const [errWhileLog, setErrWhileLog] = useState("");

  const emailSignIn = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          alert("Verificatrion Link Sent!!!");
        });
      })
      .catch((error) => {
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
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsValidate(currentUser.emailVerified);
      }
      console.log(currentUser);
    });
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
        isValidate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
