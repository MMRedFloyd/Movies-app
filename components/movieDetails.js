import classes from "./MovieDetails.module.css";
import imdbLogo from "../public/imdblogo.png";
import Image from "next/image";

function MovieDetails(props) {
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
              <ion-icon
                className={classes.logoBelow}
                name="bookmark-outline"
              ></ion-icon>
            </div>
            <div className={classes.segment}>
              <span className={classes.action}>Like</span>
              <ion-icon
                className={classes.logoBelow}
                name="heart-outline"
              ></ion-icon>
            </div>
          </div>
        </div>

        <div className={classes.contentFlex}>
          <div className={classes.headFlex}>
            <span className={classes.text}>{props.title}</span>
            <span className={classes.text}>{props.year}</span>
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
