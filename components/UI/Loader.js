import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";

let timer;
export default function Loader() {
  const loading = useSelector((state) => state.auth.loading);
  const [visible, setVisible] = useState(loading);

  const override = {
    display: "block",
    borderColor: "#ad484a",
    position: "fixed",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    if (loading) {
      console.log("setting visible to true");
      setVisible(true);
    }
    if (!timer) {
      timer = setInterval(() => {
        if (!loading) {
          console.log("setting visible to false");
          setVisible(false);
          clearInterval(timer);
          timer = null;
        }
      }, 5 * 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, [loading]);

  console.log("re-rendering Loader");
  if (!visible) return null;

  return (
    <PropagateLoader color="#ad484a" loading={visible} cssOverride={override} />
  );
}
