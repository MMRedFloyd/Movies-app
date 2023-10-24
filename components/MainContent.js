import classes from "./MainContent.module.css";
import mainImage from "../public/mainimage.jpg";
import Image from "next/image";

function MainContent() {
  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.imageContainer}>
          <Image
            src={mainImage}
            className={classes.image}
            alt="Theater image"
          />
        </div>
        <div>
          <h1>Movieeees</h1>
        </div>
      </div>
    </>
  );
}

export default MainContent;
