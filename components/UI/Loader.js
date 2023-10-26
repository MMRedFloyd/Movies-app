import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Loader(props) {
  const loading = useSelector((state) => state.auth.loading);
  const [isVisible, setIsVisible] = useState(true);

  const override = {
    display: isVisible ? "block" : "none",
    borderColor: "#ad484a",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    if (loading || props.loading) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      setIsVisible(false);
    }
  }, [loading, props.loading]);

  return (
    <>
      <PropagateLoader
        color="#ad484a"
        loading={isVisible}
        cssOverride={override}
      />
    </>
  );
}
