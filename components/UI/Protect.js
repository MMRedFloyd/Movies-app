import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/auth-contextMirza";
import FormContext from "@/context/form-contextMirza";
import HomePage from "@/pagesMirza";
import { hideForm } from "@/storeMirza";
import { useDispatch, useSelector } from "react-redux";

const protectedRoutes = ["/results", "/results/.+"];

export default function Protect({ children }) {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  // const formCtx = useContext(FormContext);
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.isVisible);

  function hideForm() {
    dispatch({ type: "hide" });
  }

  const shouldProtect = protectedRoutes.some((p) => router.pathname.match(p));

  useEffect(() => {
    if (!authCtx.isLoggedIn && !authCtx.loading) {
      hideForm();
    }
  }, [authCtx.isLoggedIn, authCtx.loading]);

  if (!authCtx.isLoggedIn && !authCtx.loading && shouldProtect) {
    return <HomePage />;
  }

  return <>{children}</>;
}
