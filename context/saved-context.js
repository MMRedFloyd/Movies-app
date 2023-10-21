import React, { useContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/components/firebaseMirza";
import AuthContext from "./auth-context";

const SavedContext = React.createContext({
  bookmarks: "",
  likes: "",
  bookmarkShow: false,
  likeShow: false,
  handleBookmarksClick: () => {},
  handleLikesClick: () => {},
  hide: () => {},
});

export function SavedContextProvider(props) {
  const [bookmarks, setBookmarks] = useState([]);
  const [likes, setLikes] = useState([]);
  const [bookmarkShow, setBookmarkShow] = useState(false);
  const [likeShow, setLikeShow] = useState(false);
  const authCtx = useContext(AuthContext);
  const currentAcc = authCtx.userUid;

  async function handleBookmarksClick() {
    try {
      const bookmarkedMoviesDocRef = doc(db, "users", currentAcc);
      const bookmarkedMoviesSnapshot = await getDoc(bookmarkedMoviesDocRef);
      if (bookmarkedMoviesSnapshot.exists()) {
        const bookmarkedMoviesData = bookmarkedMoviesSnapshot.data();
        setBookmarks(bookmarkedMoviesData.bookmarks);
        setBookmarkShow(true);
        setLikeShow(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleLikesClick() {
    try {
      const likedMoviesDocRef = doc(db, "users", currentAcc);
      const likedMoviesSnapshot = await getDoc(likedMoviesDocRef);

      if (likedMoviesSnapshot.exists()) {
        const likedMoviesData = likedMoviesSnapshot.data();
        setLikes(likedMoviesData.likes);
        setLikeShow(true);
        setBookmarkShow(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function hide() {
    setBookmarkShow(false);
    setLikeShow(false);
  }

  return (
    <SavedContext.Provider
      value={{
        bookmarks: bookmarks,
        likes: likes,
        bookmarkShow: bookmarkShow,
        likeShow: likeShow,
        handleBookmarksClick: handleBookmarksClick,
        handleLikesClick: handleLikesClick,
        hide: hide,
      }}
    >
      {props.children}
    </SavedContext.Provider>
  );
}

export default SavedContext;
