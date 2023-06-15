import classes from "../components/Menu.module.css";
import AuthContext from "@/context/auth-contextMirza";
import { useContext, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function Menu() {
  const [isRotated, setIsRotated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const currentAcc = authCtx.userUid;

  const currentUsername = authCtx.currentAcc.username;
  const menuRef = useRef();
  const buttonRef = useRef();
  console.log(currentUsername);

  async function handleBookmarksClick() {
    try {
      const bookmarkedMoviesDocRef = doc(db, "users", currentAcc);
      const bookmarkedMoviesSnapshot = await getDoc(bookmarkedMoviesDocRef);
      let bookmarkedMovies = [];

      if (bookmarkedMoviesSnapshot.exists()) {
        const bookmarkedMoviesData = bookmarkedMoviesSnapshot.data();
        const bookmarkedMovies = bookmarkedMoviesData.bookmarks || [];

        const query = { bookmarkedMovies: JSON.stringify(bookmarkedMovies) };
        console.log(query);
        router.push({
          pathname: "/results",
          query: query,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

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
              onClick={handleBookmarksClick}
            >
              Bookmarks
            </Link>
            <Link href="/results" className={classes.link}>
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
