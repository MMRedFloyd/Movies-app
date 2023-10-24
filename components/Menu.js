import classes from "../components/Menu.module.css";
import AuthContext from "@/context/auth-contextMirza";
import { useContext, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SavedContext from "@/context/saved-contextMirza";
import { handleBookmarksData, handleLikesData } from "@/store/saved-sliceMirza";
import { useDispatch } from "react-redux";

function Menu() {
  const [isRotated, setIsRotated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const currentUsername = authCtx.currentAcc.username;
  const currentAcc = authCtx.userUid;
  const menuRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleRotation() {
    setIsRotated(!isRotated);
  }

  function handleMenu() {
    setIsOpen(!isOpen);
  }

  function handleBookmarksButton() {
    console.log("button clicked");
    dispatch(handleBookmarksData(currentAcc));
  }

  function handleLikesButton() {
    console.log("button clicked");
    dispatch(handleLikesData(currentAcc));
  }

  return (
    <>
      <div className={classes.welcome}>
        <h3>Welcome back, {currentUsername}</h3>
        <div>
          <button
            className={`${classes.menu}`}
            onMouseEnter={handleRotation}
            onClick={handleMenu}
            ref={buttonRef}
          >
            <p
              className={` ${classes.text} ${isRotated ? classes.rotate : ""}`}
            >
              MENU
            </p>
          </button>
        </div>
        {isOpen && (
          <div className={classes.dashboard} ref={menuRef}>
            <Link
              href="/results"
              className={classes.link}
              onClick={() => {
                handleBookmarksButton();
                handleMenu();
              }}
            >
              Bookmarks
            </Link>
            <Link
              href="/results"
              className={classes.link}
              onClick={() => {
                handleLikesButton();
                handleMenu();
              }}
            >
              Likes
            </Link>
            <li
              className={`${classes.logout} ${classes.link}`}
              onClick={authCtx.onLogOut}
            >
              Logout
            </li>
          </div>
        )}
      </div>
    </>
  );
}

export default Menu;
