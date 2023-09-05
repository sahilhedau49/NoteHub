import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpphv-rsKTtvx_QmqT5BzXsH8DeGUEMm4",
  authDomain: "imgal-f215f.firebaseapp.com",
  projectId: "imgal-f215f",
  storageBucket: "imgal-f215f.appspot.com",
  messagingSenderId: "16062025945",
  appId: "1:16062025945:web:6efb31d70ef1d47ea3aec8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth, storage };
