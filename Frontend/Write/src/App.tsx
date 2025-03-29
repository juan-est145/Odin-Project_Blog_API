import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./Routes";

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App
