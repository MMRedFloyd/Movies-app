import { useRouter } from "next/router";

import classes from "./ResultItem.module.css";

function ResultItem(props) {
  const router = useRouter();

  function showMovieDetail() {
    // router.push("/" + props.id);
  }

  return (
    <>
      <div className={classes.containerContent} onClick={showMovieDetail}>
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
            <ion-icon className={classes.icon} name="heart-outline"></ion-icon>
            <ion-icon
              className={classes.icon}
              name="bookmark-outline"
            ></ion-icon>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResultItem;
