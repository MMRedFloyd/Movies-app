import { useEffect } from "react";
import { useRouter } from "next/router";
import HomePage from "@/pagesMirza";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "@/store/form-sliceMirza";

const protectedRoutes = ["/results", "/results/.+"];

export default function Protect({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector((state) => state.auth.loading);

  function hideForm() {
    dispatch(formActions.hideForm());
  }

  const shouldProtect = protectedRoutes.some((p) => router.pathname.match(p));

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      hideForm();
    }
  }, [isLoggedIn, loading]);

  if (!isLoggedIn && !loading && shouldProtect) {
    return <HomePage />;
  }

  return <>{children}</>;
}
