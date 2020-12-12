import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService, firebaseInstance } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initalizing"}
      <footer>&copy; puTwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
