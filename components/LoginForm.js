import classes from "./LoginForm.module.css";
import Modal from "../components/UI/Modal";
import { useRef, useContext } from "react";
import AuthContext from "../context/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { db, logInWithEmailAndPassword } from "./firebase";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";

function LoginForm(props) {
  const inputName = useRef();
  const inputPass = useRef();
  const router = useRouter();

  const ctx = useContext(AuthContext);
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.form.isVisible);

  function hideFormHandler() {
    dispatch({ type: "hide" });
  }

  function loginHandler(e) {
    e.preventDefault();
    const enteredName = inputName.current.value;
    const enteredPass = inputPass.current.value;

    ctx.onValidInputs(enteredName, enteredPass);

    inputName.current.value = "";
    inputPass.current.value = "";
  }

  // const setUserInfo = useCallback(async (userUid) => {
  //   const userDocRef = doc(db, "users", userUid);
  //   const userDocSnapshot = await getDoc(userDocRef);
  //   if (userDocSnapshot.exists()) {
  //     const user = userDocSnapshot.data();
  //     dispatch(setCurrentAcc(user));
  //     dispatch(setUserUid(userUid));
  //     dispatch(loginSuccess());
  //     return;
  //   }
  //   throw new Error(`User doc does not exist for id: ${userUid}`);
  // }, []);

  // function onValidInputs(enteredName, enteredPass) {
  //   dispatch({ type: "LOGIN_START" });
  //   logInWithEmailAndPassword(enteredName, enteredPass)
  //     .then((uid) => {
  //       console.log("user logged in:", uid);
  //       // return promise from 'setUserInfo'
  //       return setUserInfo(uid);
  //     })
  //     .then(() => {
  //       console.log("Logged in! Pushing to /results");
  //       router.push("/results");
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     })
  //     .finally(() => {
  //       dispatch({ type: "END" });
  //     });
  // }

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
