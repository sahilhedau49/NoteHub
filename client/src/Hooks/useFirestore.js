import { useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../Firebase";
import { UserAuth } from "../context/auth";

const useFirestore = () => {
  const [res, setRes] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const { user } = UserAuth();

  const getData = async (data) => {
    try {
      if (data === "private") {
        const username = user.email.split("@")[0];
        const q = query(
          collection(db, `privateData/${username}/data`),
          orderBy("createdAt", "desc")
        );
        onSnapshot(q, (querySnapshot) => {
          const d = [];
          querySnapshot.forEach((doc) => {
            const url = doc.data().docUrl;
            const name = doc.data().name;
            const createdAt = doc.data().createdAt.toDate();
            const gmail = doc.data().ownerEmail;
            d.push({ url, name, createdAt, gmail });
          });
          setRes(d);
          setIsloading(false);
        });
      } else {
        const q = query(
          collection(db, "publicData"),
          orderBy("createdAt", "desc")
        );
        onSnapshot(q, (querySnapshot) => {
          const d = [];
          querySnapshot.forEach((doc) => {
            const url = doc.data().docUrl;
            const name = doc.data().name;
            const createdAt = doc.data().createdAt.toDate();
            const gmail = doc.data().ownerEmail;
            d.push({ url, name, createdAt, gmail });
          });
          setRes(d);
          setIsloading(false);
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return { res, isLoading, getData };
};

export default useFirestore;
