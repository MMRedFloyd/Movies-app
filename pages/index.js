import { useContext } from "react";

import MainContent from "../components/MainContent";
import LoginForm from "../components/LoginForm";
import FormContext from "../context/form-context";

function HomePage() {
  const ctxForm = useContext(FormContext);

  return (
    <>
      <MainContent />
      {/* {ctxForm.isVisible && <LoginForm />} */}
    </>
  );
}

export default HomePage;
