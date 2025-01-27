import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './Routes.tsx';

const router = createBrowserRouter(routes);

export default function App() {
  // TO DO: Try with useEffect to store appearance preference in local storage
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}