import classes from "./LoginForm.module.css";
import Modal from "../components/UI/Modal";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { formActions } from "../store/form-slice";
import { allowEnter } from "@/store/auth-sliceMirza";

function LoginForm(props) {
  const inputName = useRef();
  const inputPass = useRef();
  const router = useRouter();

  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.form.isVisible);

  function hideFormHandler() {
    dispatch(formActions.hideForm());
  }

  function loginHandler(e) {
    e.preventDefault();
    const enteredName = inputName.current.value;
    const enteredPass = inputPass.current.value;

    dispatch(allowEnter(enteredName, enteredPass, router));

    inputName.current.value = "";
    inputPass.current.value = "";
  }

  return (
    <Modal open={isVisible}>
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
            onClick={hideFormHandler}
            type="button"
          >
            Cancel
          </button>

          <button className={classes.submit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default LoginForm;
