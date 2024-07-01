import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isValidate, setIsValidate] = useState(false);
  const [errWhileSign, setErrWhileSign] = useState("");
  const [errWhileLog, setErrWhileLog] = useState("");
  const [modal, setModal] = useState(false);
  const [veriMsg, setVeriMsg] = useState(false);
  const [passreseterr, setPassreseterr] = useState("");

  const emailSignIn = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          setVeriMsg(true);
        });
      })
      .catch((error) => {
        console.log(error);
        setErrWhileSign(error);
      });
  };

  const emailLogIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(
        setErrWhileLog({
          message:
            "You have not verified your email. Please check mail in your inbox to verify your account.",
        })
      )
      .catch((error) => {
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
    });
  }, []);

  const setModalStatus = (status) => {
    setModal(status);
  };

  const sendPasswordReset = (email) => {
    sendPasswordResetEmail(auth, email).catch((error) => {
      console.log(error);
      setPassreseterr(error);
    });
    console.log("Password reset link sent...");
  };

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
        modal,
        setModalStatus,
        veriMsg,
        sendPasswordReset,
        passreseterr,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
