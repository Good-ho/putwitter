import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService, firebaseInstance } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; puTwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
