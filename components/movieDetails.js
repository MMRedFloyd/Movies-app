import classes from "./MovieDetails.module.css";
import imdbLogo from "../public/imdblogo.png";
import Image from "next/image";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useCollection } from "@/hooks/useCollectionMirza";

function MovieDetails(props) {
  const { isLiked, isBookmarked, addToCollection, removeFromCollection } =
    useCollection(props);

  // const formattedVotes = parseInt(props.imdbVotes).toLocaleString("en-US");

  return (
    <>
      <div className={classes.choosenMovie}>
        <div className={classes.imgbtnsContainer}>
          <img
            src={props.image}
            className={classes.choosenImage}
            alt="Movie image"
          />
          <div className={classes.bookandlike}>
            <div className={classes.segment}>
              <span className={classes.action}>Bookmark</span>
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
            <div className={classes.segment}>
              <span className={classes.action}>Like</span>
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
            </div>
          </div>
        </div>

        <div className={classes.contentFlex}>
          <div className={classes.headFlex}>
            <span className={classes.texthelp}>{props.title}</span>
            <span className={classes.text}>({props.year})</span>
          </div>
          <div className={classes.genredur}>
            <span className={classes.text}>{props.genre}</span>
            <span className={classes.text}>{props.runtime}</span>
          </div>
          <div className={classes.imdb}>
            <Image className={classes.imdbLogo} src={imdbLogo} alt="iMDB" />
            <p className={classes.font}>{props.imdbRating}</p>
            <p className={classes.imdbVotes}>({props.imdbVotes})</p>
          </div>

          <h4 className={classes.flexColumn}>
            <span className={classes.help2}>Actors</span>
            <span className={classes.text}>{props.actors}</span>
          </h4>

          <h4 className={classes.flexColumn}>
            <span className={classes.help2}>Plot</span>
            <span className={classes.text}>{props.description}</span>
          </h4>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
