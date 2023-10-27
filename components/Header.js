import Image from "next/image";
import logo from "../public/logo.png";
import classes from "./Header.module.css";
import Link from "next/link";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../store/form-slice";
import { startActions } from "@/store/start-sliceMirza";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  function showWelcome() {
    dispatch(
      startActions.manageStartSite({
        message: true,
        resultsPage: false,
      })
    );
  }

  function showFormHandler() {
    dispatch(formActions.showForm());
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
        <h3 className={classes.nameofapp} onClick={showWelcome}>
          Movies App
        </h3>
      </Link>
      <Link href="/results">
        <Image
          className={classes.logo}
          src={logo}
          alt="Movies App logo"
          onClick={showWelcome}
        />
      </Link>
      {isLoggedIn && <Menu />}
      {!isLoggedIn && (
        <button className={classes.login} onClick={showFormHandler}>
          Log In
        </button>
      )}
    </header>
  );
}

export default Header;
