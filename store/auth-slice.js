import { createSlice } from "@reduxjs/toolkit";
import { db, auth, logInWithEmailAndPassword } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { startActions } from "./start-slice";

const initialStateAuth = {
  isLoggedIn: false,
  loading: true,
  currentAcc: "",
  userUid: "",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {
    setUserInfo(state, action) {
      state.currentAcc = action.payload.currentAcc;
      state.userUid = action.payload.userUid;
      state.isLoggedIn = true;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    logout(state) {
      state.currentAcc = null;
      state.isLoggedIn = false;
      state.userUid = "";
      state.loading = false;
      state.setMessage = false;
    },
    loadingFun() {
      state.loading = !state.loading;
    },
  },
});

export function allowEnter(enteredName, enteredPass, router) {
  return async (dispatch) => {
    dispatch(authActions.setLoading(true));
    dispatch(startActions.manageStartSite({ message: false }));
    logInWithEmailAndPassword(enteredName, enteredPass)
      .then(async (uid) => {
        console.log("user logged in:", uid);
        const userDocRef = doc(db, "users", uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const user = userDocSnapshot.data();
          dispatch(
            authActions.setUserInfo({
              currentAcc: user,
              userUid: uid,
            })
          );
          return;
        }
      })
      .then(() => {
        console.log("Logged in! Pushing to /results");
        router.push("/results");
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        dispatch(authActions.setLoading(false));
      });
  };
}

export function checkAuthOpsAndUnsubscribe(router) {
  return async (dispatch) => {
    // dispatch(authActions.setLoading(true));
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
          const userDocRef = doc(db, "users", authUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          console.log(userDocSnapshot.data());
          if (userDocSnapshot.exists()) {
            const user = userDocSnapshot.data();
            dispatch(
              authActions.setUserInfo({
                currentAcc: user,
                userUid: authUser.uid,
              })
            );
            console.log("Logged in! Pushing to /results");
            router.push("/results");
          }
        }
      }

      // always setLoading to false when done
      dispatch(authActions.setLoading(false));
    }

    try {
      await checkAuthOps();
    } catch (error) {
      console.log(error.message);
    }

    const unsubscribe = onAuthStateChanged(auth, function (user) {
      // check IF no user AND NOT
      // in a loading state
      if (!user) {
        console.log("No user found user:", user);

        dispatch(authActions.logout());
      } else {
        console.log("user is logged in:", user);
      }
    });

    return () => {
      unsubscribe();
    };
  };
}

export function logOut(router) {
  return async () => {
    return signOut(auth)
      .then(router.push("/"))
      .catch((err) => {
        console.log(err.message);
      });
  };
}

export const authActions = authSlice.actions;

export default authSlice;
