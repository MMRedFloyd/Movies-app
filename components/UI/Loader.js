import { useSelector } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Loader(props) {
  const loading = useSelector((state) => state.auth.loading);

  const override = {
    display: "block",
    borderColor: "#ad484a",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      <PropagateLoader
        color="#ad484a"
        loading={loading || props.loading}
        cssOverride={override}
      />
    </>
  );
}
