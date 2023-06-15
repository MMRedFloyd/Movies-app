import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { db, auth, logInWithEmailAndPassword } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import PropagateLoader from "react-spinners/PropagateLoader";

const AuthContext = React.createContext({
  isLoggedIn: false,
  loading: true,
  currentAcc: "",
  userUid: "",

  onValidInputs: (enteredName, enteredPass) => {},
  onLogOut: () => {},
});

const override = {
  display: "block",
  borderColor: "#ad484a",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export function AuthContextProvider(props) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAcc, setCurrentAcc] = useState("");
  const [userUid, setUserUid] = useState("");

  const router = useRouter();

  // useEffect(() => {
  //   if (loading) {
  //     // maybe trigger a loading screen
  //     return;
  //   }
  //   if (user) router.push("/results");
  // }, [user, loading]);

  function allowEnter(enteredName, enteredPass) {
    logInWithEmailAndPassword(enteredName, enteredPass)
      .then(() => {
        console.log(auth);
        console.log("user logged in:", auth.currentUser.uid);
        setUserUid(auth.currentUser.uid);
        setLoading(true);
        setIsLoggedIn(true);
        router.push("/results");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoggedIn(false);
      });
  }

  useEffect(() => {
    async function getUsername(userUid) {
      try {
        const userDocRef = doc(db, "users", userUid);
        const userDocSnapshot = await getDoc(userDocRef);
        console.log(userDocSnapshot);
        if (userDocSnapshot.exists()) {
          const user = userDocSnapshot.data();
          setCurrentAcc(user);
        }
        // setLoading(false);
      } catch (err) {
        console.log(err.message);
        // setLoading(false);
      }
    }

    getUsername(userUid);
  }, [userUid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentAcc(user);
        setIsLoggedIn(true);
        setUserUid(user.uid);
      } else {
        setCurrentAcc(null);
        setIsLoggedIn(false);
        setUserUid("");
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function logOut() {
    signOut(auth)
      // we don't care about 'then'
      // we only care to know if we got
      // an error for some reason
      .catch((err) => {
        console.log(err.message);
      })
      // run this code regardless
      // of if the promise resolves
      .finally(() => {
        setIsLoggedIn(false);
        setCurrentAcc("");
        setUserUid("");
        // router.push("/");
      });
  }

  // console.log(isLoggedIn, currentAcc, userUid);

  if (loading) {
    return (
      <PropagateLoader
        color="#ad484a"
        loading={loading}
        cssOverride={override}
      />
    );
  }

  return (
    <AuthContext.Provider
      value={{
        loading: loading,
        isLoggedIn: isLoggedIn,
        onValidInputs: allowEnter,
        currentAcc: currentAcc,
        onLogOut: logOut,
        userUid: userUid,
      }}
    >
      {!loading && props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
