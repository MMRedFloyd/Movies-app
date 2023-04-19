import classes from "./MainContent.module.css";
import mainImage from "../public/mainimage.avif";
import Image from "next/image";

function MainContent() {
  return (
    <>
      <Image src={mainImage} className={classes.image} alt="Theater image" />
    </>
  );
}

export default MainContent;
