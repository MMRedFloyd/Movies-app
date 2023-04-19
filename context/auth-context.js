import React, { useState } from "react";

const AuthContext = React.createContext({
  isValidLogin: false,
  onValidInputs: (enteredName, enteredPass) => {},
});

const USERS = [
  {
    username: "Mirza",
    password: "123",
  },
  {
    username: "Mujkic",
    password: 456,
  },
];

export function AuthContextProvider(props) {
  const [isValidLogin, setIsValidLogin] = useState(false);

  function allowEnter(enteredName, enteredPass) {
    const userIsPresent = USERS.find((user) => user.username === enteredName);

    if (userIsPresent && userIsPresent.password === enteredPass) {
      console.log("Login is successful");
      setIsValidLogin(true);
    } else {
      console.log("Nešto ne valja");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isValidLogin: isValidLogin,
        onValidInputs: allowEnter,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
