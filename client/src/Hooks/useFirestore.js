import { useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { UserAuth } from "../context/auth";

const useFirestore = () => {
  const [res, setRes] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const { user } = UserAuth();

  const handleDocDelete = async (dataKey) => {
    try {
      await deleteDoc(doc(db, "publicData", dataKey));
    } catch (error) {
      console.log(error);
    }
  };

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
            const dataKey = doc.id;
            const url = doc.data().docUrl;
            const name = doc.data().name;
            const createdAt = doc.data().createdAt.toDate();
            const gmail = doc.data().ownerEmail;
            d.push({ dataKey, url, name, createdAt, gmail });
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
            const dataKey = doc.id;
            const url = doc.data().docUrl;
            const name = doc.data().name;
            const createdAt = doc.data().createdAt.toDate();
            const gmail = doc.data().ownerEmail;
            d.push({ dataKey, url, name, createdAt, gmail });
          });
          setRes(d);
          setIsloading(false);
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return { res, isLoading, getData, handleDocDelete };
};

export default useFirestore;
