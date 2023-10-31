import Image from "next/image";
import logo from "../public/logo.png";
import classes from "./Header.module.css";
import Link from "next/link";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../store/form-slice";
import { startActions } from "@/store/start-sliceMirza";
import { savedActions } from "@/store/saved-sliceMirza";
import { authActions } from "@/store/auth-sliceMirza";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // function showWelcome() {
  //   dispatch(authActions.setLoading(true));
  //   console.log(loading);
  //   dispatch(
  //     startActions.manageStartSite({
  //       message: true,
  //       resultsPage: false,
  //     })
  //   );
  //   dispatch(savedActions.hide());
  //   console.log(loading);
  //   dispatch(authActions.setLoading(false));

  //   console.log(loading);
  // }

  async function showWelcome() {
    dispatch(authActions.setLoading(true));
    await new Promise((resolve) => setTimeout(resolve, 0));
    dispatch(savedActions.hide());
    await new Promise((resolve) => setTimeout(resolve, 0));
    dispatch(
      startActions.manageStartSite({
        message: true,
        resultsPage: false,
      })
    );

    dispatch(authActions.setLoading(false));
  }

  function showFormHandler() {
    dispatch(formActions.showForm());
  }

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
