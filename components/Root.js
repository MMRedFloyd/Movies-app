import { useContext } from "react";
import Header from "./Header";
import AuthContext from "@/context/auth-contextMirza";

function Rootlayout(props) {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Header />
      <div>{props.children}</div>
    </>
  );
}

export default Rootlayout;
