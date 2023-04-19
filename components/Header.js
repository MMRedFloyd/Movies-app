import Image from "next/image";
import logo from "../public/logo.png";
import classes from "./Header.module.css";
import { useContext } from "react";
import FormContext from "../context/form-context";

function Header(props) {
  const ctxForm = useContext(FormContext);

  return (
    <header className={classes.navbar}>
      <h3 className={classes.nameofapp}>Movies App</h3>
      <Image className={classes.logo} src={logo} alt="Movies App logo" />
      <button className={classes.login} onClick={ctxForm.onShow}>
        Log In
      </button>
    </header>
  );
}

export default Header;
