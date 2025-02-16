import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './Routes.tsx';
import { PrimeReactProvider } from "primereact/api";

const router = createBrowserRouter(routes);

// TO DO: Set a global is login object

export default function App() {
  return (
    <>
      <PrimeReactProvider>
        <RouterProvider router={router}></RouterProvider>
      </PrimeReactProvider>
    </>
  );
}