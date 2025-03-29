import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const jwt: string | null = localStorage.getItem("jwt");
    if (jwt)
      setLoggedIn(true);
    else
      setLoggedIn(false);
  }, []);
  return (
    <>
      { loggedIn ? <h1>You are logged in</h1> : <h1>You are not logged in</h1> }
    </>
  )
}

export default App
