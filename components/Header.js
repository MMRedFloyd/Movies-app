import Image from "next/image";
import logo from "../public/logo.png";
import classes from "./Header.module.css";
import { useContext, useEffect, useState } from "react";
import FormContext from "../context/form-context";
import Link from "next/link";
import AuthContext from "@/context/auth-contextMirza";
import { BsFillBookmarksFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import BookmarksList from "./BookmarksList";
import LikesList from "./LikesList";
import { base, db } from "./firebase";
import { getDoc, getDocs, doc } from "firebase/firestore";
import Menu from "./Menu";

function Header(props) {
  const ctxForm = useContext(FormContext);
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showLikes, setShowLikes] = useState(false);

  useEffect(() => {
    if (router.pathname === "/") {
      authCtx.onLogOut();
    }
  }, [router]);

  function displayBookmarks() {
    setShowBookmarks(true);
  }

  function hideBookmarks() {
    setShowBookmarks(false);
  }

  function displayLikes() {
    setShowLikes(true);
  }

  function hideLikes() {
    setShowLikes(false);
  }

  // return (
  //   <header className={classes.navbar}>
  //     <Link href="/results" className={classes.nodec}>
  //       <h3 className={classes.nameofapp}>Movies App</h3>
  //     </Link>
  //     <Link href="/results">
  //       <Image className={classes.logo} src={logo} alt="Movies App logo" />
  //     </Link>
  //     {authCtx.isLoggedIn && (
  //       <div className={classes.welcome}>
  //         <h3>Welcome back, {authCtx.currentAcc.username}</h3>
  //         <BsFillBookmarksFill
  //           className={classes.icons}
  //           // onMouseEnter={displayBookmarks}
  //           // onMouseLeave={hideBookmarks}
  //         />
  //         <BookmarksList className={classes.icons} />
  //         <AiFillHeart
  //           size={25}
  //           className={classes.icons}
  //           onMouseOver={displayLikes}
  //           onMouseOut={hideLikes}
  //         />
  //       </div>
  //     )}
  //     {!authCtx.isLoggedIn && (
  //       <button className={classes.login} onClick={ctxForm.onShow}>
  //         Log In
  //       </button>
  //     )}
  //     {/* {showBookmarks && (
  //       <BookmarksList open={showBookmarks} allowEnter={displayBookmarks} />
  //     )}
  //     {showLikes && <LikesList open={showLikes} />} */}
  //   </header>
  // );
  // const currentUsername = base
  //   .doc(user.uid)
  //   .get()
  //   .then((doc) => doc.data().username);

  return (
    <header className={classes.navbar}>
      <Link href="/results" className={classes.nodec}>
        <h3 className={classes.nameofapp}>Movies App</h3>
      </Link>
      <Link href="/results">
        <Image className={classes.logo} src={logo} alt="Movies App logo" />
      </Link>
      {authCtx.isLoggedIn && <Menu />}
      {!authCtx.isLoggedIn && (
        <button className={classes.login} onClick={ctxForm.onShow}>
          Log In
        </button>
      )}
    </header>
  );
}

export default Header;
