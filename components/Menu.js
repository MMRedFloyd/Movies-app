import classes from "../components/Menu.module.css";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { handleBookmarksData, handleLikesData } from "@/store/saved-sliceMirza";
import { useDispatch, useSelector } from "react-redux";
import { authActions, logOut } from "@/store/auth-sliceMirza";
import { useRouter } from "next/router";
import { startActions } from "@/store/start-sliceMirza";
import WidgetsIcon from "@mui/icons-material/Widgets";

function Menu() {
  const [isRotated, setIsRotated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUsername = useSelector(
    (state) => state.auth.currentAcc.username
  );
  const currentAcc = useSelector((state) => state.auth.userUid);
  const router = useRouter();

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
    dispatch(startActions.manageStartSite({ message: false }));
    dispatch(authActions.setLoading(true));
    dispatch(handleBookmarksData(currentAcc));
  }

  function handleLikesButton() {
    console.log("button clicked");
    dispatch(startActions.manageStartSite({ message: false }));
    dispatch(authActions.setLoading(true));
    dispatch(handleLikesData(currentAcc));
  }

  return (
    <>
      <div className={classes.welcome}>
        <h3>Welcome back, {currentUsername}</h3>
        <div>
          {/* <button
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
          </button> */}
          <WidgetsIcon
            sx={{ fontSize: 40 }}
            ref={buttonRef}
            onClick={handleMenu}
          ></WidgetsIcon>
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
              onClick={logOut(router)}
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
