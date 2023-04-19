import React, { useState } from "react";

const FormContext = React.createContext({
  isVisible: false,
  showFormHandler: () => {},
  hideFormHandler: () => {},
});

export function FormContextProvider(props) {
  const [isVisible, setIsVisible] = useState(false);

  function showFormHandler() {
    setIsVisible(true);
  }

  function hideFormHandler() {
    setIsVisible(false);
  }

  return (
    <FormContext.Provider
      value={{
        isVisible: isVisible,
        onShow: showFormHandler,
        onHide: hideFormHandler,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
}

export default FormContext;
