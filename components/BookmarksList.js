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
    const fetchedBookmarks = authCtx.currentAcc?.bookmarks || [];
    setBookmarks(fetchedBookmarks);
  }, [authCtx.currentAcc]);

  return (
    // <Lists open={props.open}>
    // <div className={classes.bookmarksList}>
    <div className={classes.bookmarksList}>
      {bookmarks.map((bookmark) => (
        <li
          className={classes.onebookmark}
          key={bookmark.id}
          // onMouseEnter={continueShowing}
        >
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
    // </div>
    // </Lists>
  );
}

export default BookmarksList;
