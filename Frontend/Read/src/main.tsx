import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import routes from './Routes.tsx';
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";


const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme accentColor="teal" grayColor="olive" scaling="95%">
      <RouterProvider router={router}></RouterProvider>
      <ThemePanel/>
    </Theme>
  </StrictMode>,
)
