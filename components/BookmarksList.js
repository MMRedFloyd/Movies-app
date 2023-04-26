import { useContext, useEffect, useState } from "react";
import classes from "./BookmarksList.module.css";
import AuthContext from "@/context/auth-contextMirza";
import Lists from "./UI/Lists";
import { FaBookmark } from "react-icons/fa";
import { useCollection } from "@/hooks/useCollectionMirza";

function BookmarksList(props) {
  const [bookmarks, setBookmarks] = useState([]);
  const authCtx = useContext(AuthContext);
  const { removeFromCollection } = useCollection(props);

  useEffect(() => {
    async function getBookmarks() {
      const response = await fetch(
        "https://movies-app-f63b3-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      const data = await response.json();

      const foundedUser = Object.values(data).find(
        (user) => user.username === authCtx.currentAcc.username
      );

      setBookmarks(foundedUser.bookmarks);
    }
    getBookmarks();
  }, [authCtx]);

  return (
    <Lists open={props.open}>
      <div className={classes.bookmarksList}>
        {bookmarks.map((bookmark) => (
          <li className={classes.onebookmark} key={bookmark.id}>
            <img className={classes.littleimage} src={bookmark.image} alt="" />
            <div className={classes.titleandyear}>
              <p className={classes.bookmarktitle}>{bookmark.title}</p>
              <p className={classes.bookmarktitle}>{bookmark.year}</p>
            </div>
            <FaBookmark
              size={30}
              className={classes.listicon}
              onClick={(e) => removeFromCollection(e, "bookmarks")}
            />
          </li>
        ))}
      </div>
    </Lists>
  );
}

export default BookmarksList;
