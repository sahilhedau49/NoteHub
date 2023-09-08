import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../Firebase";

const useFirestore = () => {
  const [res, setRes] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    try {
      const q = query(
        collection(db, "documents"),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        const d = [];
        querySnapshot.forEach((doc) => {
          const url = doc.data().docUrl;
          const createdAt = doc.data().createdAt.toDate();
          const gmail = doc.data().ownerEmail;
          d.push({ url, createdAt, gmail });
        });
        setRes(d);
        setIsloading(false);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return { res, isLoading };
};

export default useFirestore;
