import classes from "./LoginForm.module.css";
// import Modal from "../components/UI/Modal";
import { useRef, useContext } from "react";
import AuthContext from "../context/auth-context";
import { Link } from "react-router-dom";
import FormContext from "../context/form-context";

function LoginForm(props) {
  const inputName = useRef();
  const inputPass = useRef();

  const ctx = useContext(AuthContext);
  const ctxForm = useContext(FormContext);

  function loginHandler(e) {
    e.preventDefault();
    const enteredName = inputName.current.value;
    const enteredPass = inputPass.current.value;

    inputName.current.value = "";
    inputPass.current.value = "";

    ctx.onValidInputs(enteredName, enteredPass);
    console.log(enteredName, enteredPass);
  }

  return (
    <Modal>
      <form className={classes.form} onSubmit={loginHandler}>
        <input
          className={classes.input}
          type="text"
          placeholder="Username"
          ref={inputName}
        />
        <input
          className={classes.input}
          type="password"
          placeholder="Password"
          ref={inputPass}
        />
        <div className={classes.buttons}>
          <button
            className={classes.submit}
            onClick={ctxForm.onHide}
            type="button"
          >
            Cancel
          </button>
          <Link to="/welcome">
            <button className={classes.submit} type="submit">
              Submit
            </button>
          </Link>
        </div>
      </form>
    </Modal>
  );
}

export default LoginForm;
