const { createSlice } = require("@reduxjs/toolkit");
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/components/firebaseMirza";

const initialStateSaved = {
  bookmarks: [],
  likes: [],
  bookmarkShow: false,
  likeShow: false,
};

const savedSlice = createSlice({
  name: "saved",
  initialState: initialStateSaved,
  reducers: {
    handleBookmarksClick(state, action) {
      state.bookmarks = action.payload.bookmarks;
      state.bookmarkShow = true;
      state.likeShow = false;
    },

    handleLikesClick(state, action) {
      state.likes = action.payload.likes;
      state.likeShow = true;
      state.bookmarkShow = false;
    },

    hide(state) {
      state.bookmarkShow = false;
      state.likeShow = false;
    },
  },
});

export function handleBookmarksData(currentAcc) {
  return async (dispatch) => {
    async function handleBookmarks() {
      const bookmarkedMoviesDocRef = doc(db, "users", currentAcc);
      const bookmarkedMoviesSnapshot = await getDoc(bookmarkedMoviesDocRef);

      if (bookmarkedMoviesSnapshot.exists()) {
        const bookmarkedMoviesData = bookmarkedMoviesSnapshot.data();

        dispatch(
          savedActions.handleBookmarksClick({
            bookmarks: bookmarkedMoviesData.bookmarks,
          })
        );
      }
    }

    try {
      await handleBookmarks();
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleLikesData(currentAcc) {
  return async (dispatch) => {
    async function handleLikes() {
      const likedMoviesDocRef = doc(db, "users", currentAcc);
      const likedMoviesSnapshot = await getDoc(likedMoviesDocRef);

      if (likedMoviesSnapshot.exists()) {
        const likedMoviesData = likedMoviesSnapshot.data();

        dispatch(
          savedActions.handleLikesClick({
            likes: likedMoviesData.likes,
          })
        );
      }
    }

    try {
      await handleLikes();
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const savedActions = savedSlice.actions;

export default savedSlice;
