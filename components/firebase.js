import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACnYZyE1-roPms7nJ7UwWOHZv4D_6KDSc",
  authDomain: "movies-app-f63b3.firebaseapp.com",
  databaseURL:
    "https://movies-app-f63b3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "movies-app-f63b3",
  storageBucket: "movies-app-f63b3.appspot.com",
  messagingSenderId: "1036798976215",
  appId: "1:1036798976215:web:1cffe651e1f8115c835092",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const base = collection(db, "users");

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await setPersistence(
      auth,
      browserLocalPersistence
    ).then(() => signInWithEmailAndPassword(auth, email, password));
    const userUid = userCredential.user.uid;
    console.log("User ID:", userUid);
    return userUid;
  } catch (err) {
    console.log(err.message);
    console.log(err.code);
    if (
      err.code === "auth/user-not-found" ||
      err.code === "auth/wrong-password" ||
      err.code === "auth/invalid-email"
    ) {
      console.log("Invalid email or password. Please try again.");
      // Display an error message to the user or handle it in your desired way
    } else {
      console.log("An error occurred during login. Please try again later.");
      // Display a generic error message or handle other specific error cases
    }
    throw err;
  }
};

export {
  auth,
  db,
  base,
  logInWithEmailAndPassword,
  // logout,
};
