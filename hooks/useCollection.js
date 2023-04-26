import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context";

export const useCollection = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.currentAcc) {
      const fetchData = async () => {
        const response = await fetch(
          "https://movies-app-f63b3-default-rtdb.europe-west1.firebasedatabase.app/users.json"
        );
        const data = await response.json();

        const foundedUser = Object.values(data).find(
          (user) => user.username === authCtx.currentAcc.username
        );

        if (foundedUser) {
          if (
            foundedUser.likes &&
            foundedUser.likes.some((movie) => movie.id === props.id)
          ) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }

          if (
            foundedUser.bookmarks &&
            foundedUser.bookmarks.some((movie) => movie.id === props.id)
          ) {
            setIsBookmarked(true);
          } else {
            setIsBookmarked(false);
          }
        }
      };

      fetchData();
    }
  }, [authCtx.currentAcc, props.id]);

  const addToCollection = async (e, collectionType) => {
    e.preventDefault();

    const response = await fetch(
      "https://movies-app-f63b3-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    );
    const data = await response.json();

    let userId;
    Object.keys(data).forEach((key) => {
      const user = data[key];
      if (user.username === authCtx.currentAcc.username) {
        userId = key;
      }
    });

    const foundedUser = Object.values(data).find(
      (user) => user.username === authCtx.currentAcc.username
    );

    let collectionList = foundedUser[collectionType] || [];
    let formatted = Object.values(collectionList);

    if (!formatted.includes(props.id)) {
      formatted.push({
        id: props.id,
        title: props.title,
        year: props.year,
        image: props.image,
        genre: props.genre,
      });

      const body =
        collectionType === "bookmarks"
          ? { bookmarks: formatted }
          : { likes: formatted };
      fetch(
        `https://movies-app-f63b3-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (collectionType === "bookmarks") {
        setIsBookmarked(true);
      } else if (collectionType === "likes") {
        setIsLiked(true);
      }
    }
  };

  const removeFromCollection = async (e, collectionType) => {
    e.preventDefault();
    console.log(props);

    const response = await fetch(
      "https://movies-app-f63b3-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    );
    const data = await response.json();

    let userId;
    Object.keys(data).forEach((key) => {
      const user = data[key];
      if (user.username === authCtx.currentAcc.username) {
        userId = key;
      }
    });

    const foundedUser = Object.values(data).find(
      (user) => user.username === authCtx.currentAcc.username
    );

    let collectionList = foundedUser[collectionType];
    let formatted = Object.values(collectionList);
    console.log(formatted);

    if (formatted.some((bookmark) => bookmark.id === props.id)) {
      formatted = formatted.filter((item) => item.id !== props.id);
      console.log(props.id);

      const body =
        collectionType === "bookmarks"
          ? { bookmarks: formatted }
          : { likes: formatted };
      fetch(
        `https://movies-app-f63b3-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (collectionType === "bookmarks") {
        setIsBookmarked(false);
      } else if (collectionType === "likes") {
        setIsLiked(false);
      }
    }
  };

  return { isLiked, isBookmarked, addToCollection, removeFromCollection };
};
