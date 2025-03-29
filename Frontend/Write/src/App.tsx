import { useAuth } from "./Context";

function App() {
  const { loggedIn } = useAuth();
  return (
    <>
      { loggedIn ? <h1>You are logged in</h1> : <h1>You are not logged in</h1> }
    </>
  )
}

export default App
