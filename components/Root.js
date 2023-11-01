import { useRouter } from "next/router";
import Header from "./Header";
import Protect from "./UI/Protect";
import { useDispatch } from "react-redux";
import { checkAuthOpsAndUnsubscribe } from "@/store/auth-sliceMirza";
import { useEffect } from "react";
import LoaderPages from "./UI/LoaderPages";

function Rootlayout(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthOpsAndUnsubscribe(router));
  }, []);

  return (
    <>
      <Protect>
        <LoaderPages>
          <Header />
          <div>{props.children}</div>
        </LoaderPages>
      </Protect>
    </>
  );
}

export default Rootlayout;
