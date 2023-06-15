import { useContext } from "react";
import Header from "./Header";
import AuthContext from "@/context/auth-contextMirza";
import Protect from "./UI/Protect";

function Rootlayout(props) {
  const authCtx = useContext(AuthContext);
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
