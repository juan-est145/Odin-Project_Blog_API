import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './Routes.tsx';
import { PrimeReactProvider } from "primereact/api";
import { LoggedProvider } from './Context.tsx';

const router = createBrowserRouter(routes);

export default function App() {

  return (
    <>
      <LoggedProvider>
        <PrimeReactProvider>
          <RouterProvider router={router}></RouterProvider>
        </PrimeReactProvider>
      </LoggedProvider>

    </>
  );
}

