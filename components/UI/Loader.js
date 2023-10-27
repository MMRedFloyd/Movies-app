// import { useSelector } from "react-redux";
// import PropagateLoader from "react-spinners/PropagateLoader";

// export default function Loader() {
//   const loading = useSelector((state) => state.auth.loading);

//   const override = {
//     display: "block",
//     borderColor: "#ad484a",
//     position: "fixed",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//   };

//   return (
//     <>
//       <PropagateLoader
//         color="#ad484a"
//         loading={loading}
//         cssOverride={override}
//       />
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Loader() {
  const loading = useSelector((state) => state.auth.loading);
  const [isVisible, setIsVisible] = useState(loading);

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
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
  }, [loading]);

  return (
    <PropagateLoader
      color="#ad484a"
      loading={isVisible}
      cssOverride={override}
    />
  );
}
