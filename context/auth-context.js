import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";

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
  loadingFun: () => {},
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
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAcc, setCurrentAcc] = useState("");
  const [userUid, setUserUid] = useState("");

  const setUserInfo = useCallback(async (userUid) => {
    const userDocRef = doc(db, "users", userUid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const user = userDocSnapshot.data();
      setCurrentAcc(user);
      setUserUid(userUid);
      setIsLoggedIn(true);
      return;
    }
    throw new Error(`User doc does not exist for id: ${userUid}`);
  }, []);

  function allowEnter(enteredName, enteredPass) {
    setLoading(true);
    logInWithEmailAndPassword(enteredName, enteredPass)
      .then((uid) => {
        console.log("user logged in:", uid);
        // return promise from 'setUserInfo'
        return setUserInfo(uid);
      })
      .then(() => {
        console.log("Logged in! Pushing to /results");
        router.push("/results");
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    async function checkAuthOps() {
      // unsure if I need to check if this is a promise
      // but did it anyways, then we await its resolution
      if (Promise.prototype.isPrototypeOf(auth.operations)) {
        // wait for operations promise to resolve
        await auth.operations;

        // get the currentUser data
        const authUser = auth.currentUser;

        // make sure we have a value
        if (authUser) {
          // call setUserInfo with the uid
          await setUserInfo(authUser.uid).then(() => {
            console.log("Logged in! Pushing to /results");
            router.push("/results");
          });
        }
      }

      // always setLoading to false when done
      setLoading(false);
    }

    checkAuthOps();

    const unsubscribe = onAuthStateChanged(auth, function (user) {
      // check IF no user AND NOT
      // in a loading state
      if (!user) {
        console.log("No user found user:", user);
        setCurrentAcc(null);
        setIsLoggedIn(false);
        setUserUid("");
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // No user, check if we need to redirect
    if (!currentAcc && router.pathname !== "/") {
      router.push("/");
    }
  }, [router.pathname, currentAcc]);

  function logOut() {
    return signOut(auth).catch((err) => {
      console.log(err.message);
    });
  }

  function loadingFun() {
    setLoading(!loading);
  }

  let content = props.children;

  if (loading) {
    content = (
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
        loadingFun: loadingFun,
      }}
    >
      {content}
    </AuthContext.Provider>
  );
}

export default AuthContext;
