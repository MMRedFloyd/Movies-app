import { useRouter } from "next/router";
import Header from "./Header";
import Protect from "./UI/Protect";
import { useDispatch } from "react-redux";
import { checkAuthOpsAndUnsubscribe } from "@/store/auth-sliceMirza";
import { useEffect } from "react";

function Rootlayout(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthOpsAndUnsubscribe(router));
  }, []);

  return (
    <>
      <Header />
      <Protect>
        <div>{props.children}</div>
      </Protect>
    </>
  );
}

export default Rootlayout;
