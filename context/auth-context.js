import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  currentAcc: "",
  onValidInputs: (enteredName, enteredPass) => {},
  onLogOut: () => {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentAcc, setCurrentAcc] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getUsersData(req, res) {
      const response = await fetch(
        "https://movies-app-f63b3-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      const userData = await response.json();
      setUsers(userData);
    }
    getUsersData();
  }, []);

  function allowEnter(enteredName, enteredPass) {
    const currentAccount = Object.values(users).find(
      (user) => user.username === enteredName
    );

    setCurrentAcc(currentAccount);
    if (currentAccount && currentAccount.password.toString() === enteredPass) {
      setIsLoggedIn(true);
      router.push("/results");
    } else {
      setIsLoggedIn(false);
      console.log("Nema takog korisnika");
    }
  }

  function logOut() {
    setIsLoggedIn(false);
    setCurrentAcc("");
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onValidInputs: allowEnter,
        currentAcc: currentAcc,
        onLogOut: logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
