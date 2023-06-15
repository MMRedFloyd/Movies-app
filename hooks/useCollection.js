import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../components/firebase";

export const useCollection = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [user, setUser] = useState("");
  const authCtx = useContext(AuthContext);
  const currentUid = authCtx.userUid;

  useEffect(() => {
    if (authCtx.currentAcc) {
      async function fetchData(currentUid) {
        try {
          const userDocRef = doc(db, "users", currentUid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const user = userDocSnapshot.data();
            setUser(user);

            let formatted = [];

            if (
              user.likes &&
              user.likes.some((movie) => movie.id === props.id)
            ) {
              setIsLiked(true);
              formatted = Object.values(user.likes);
            } else {
              setIsLiked(false);
            }

            if (
              user.bookmarks &&
              user.bookmarks.some((movie) => movie.id === props.id)
            ) {
              setIsBookmarked(true);
              formatted = Object.values(user.bookmarks);
            } else {
              setIsBookmarked(false);
            }
          }
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchData(currentUid);
    }
  }, [currentUid, props.id, authCtx.currentAcc]);

  const addToCollection = async (e, collectionType) => {
    e.preventDefault();

    let collectionList = user[collectionType] || [];
    let formatted = Object.values(collectionList);

    if (!formatted.includes(props.id)) {
      formatted.push({
        id: props.id,
        title: props.title,
        year: props.year,
        image: props.image,
      });
    }

    const body =
      collectionType === "bookmarks"
        ? { bookmarks: formatted }
        : { likes: formatted };

    const userDocRef = doc(db, "users", currentUid);
    await updateDoc(userDocRef, body);

    if (collectionType === "bookmarks") {
      setIsBookmarked(true);
    } else if (collectionType === "likes") {
      setIsLiked(true);
    }
  };

  const removeFromCollection = async (e, collectionType) => {
    e.preventDefault();

    let collectionList = user[collectionType];
    let formatted = Object.values(collectionList);

    if (formatted.some((bookmark) => bookmark.id === props.id)) {
      formatted = formatted.filter((item) => item.id !== props.id);

      const body =
        collectionType === "bookmarks"
          ? { bookmarks: formatted }
          : { likes: formatted };

      const userDocRef = doc(db, "users", currentUid);
      await updateDoc(userDocRef, body);

      if (collectionType === "bookmarks") {
        setIsBookmarked(false);
      } else if (collectionType === "likes") {
        setIsLiked(false);
      }
    }
  };

  return { isLiked, isBookmarked, addToCollection, removeFromCollection };
};
