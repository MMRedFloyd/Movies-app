import classes from "./ResultItem.module.css";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useCollection } from "@/hooks/useCollectionMirza";

function ResultItem(props) {
  const { isLiked, isBookmarked, addToCollection, removeFromCollection } =
    useCollection(props);

  return (
    <>
      <div className={classes.containerContent}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={props.image} alt="Movie image" />
        </div>
        <div className={classes.smallInfo}>
          <div className={classes.tyg}>
            <span className={classes.span}>{props.title}</span>
            <span className={classes.span}>{props.year}</span>
            <span className={classes.span}>{props.genre}</span>
          </div>
          <div className={classes.containerLikeBook}>
            {!isLiked && (
              <AiOutlineHeart
                size={30}
                onClick={(e) => addToCollection(e, "likes")}
              />
            )}
            {isLiked && (
              <AiFillHeart
                size={30}
                onClick={(e) => removeFromCollection(e, "likes")}
              />
            )}
            {!isBookmarked && (
              <FaRegBookmark
                size={30}
                onClick={(e) => addToCollection(e, "bookmarks")}
              />
            )}
            {isBookmarked && (
              <FaBookmark
                size={30}
                onClick={(e) => removeFromCollection(e, "bookmarks")}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default ResultItem;
