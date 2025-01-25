import {
  Theme,
  ThemePanel,
  ThemeProps,
} from "@radix-ui/themes";

import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import routes from './Routes.tsx';
import { useState } from "react";

const router = createBrowserRouter(routes);

export default function App() {
  const [appearance, setApperance] = useState<ThemeProps["appearance"]>("dark");

  return (
    <>
      <Theme accentColor="teal" grayColor="olive" scaling="95%" appearance={appearance}>
        <RouterProvider router={router}></RouterProvider>
        <ThemePanel />
      </Theme>
    </>
  );

}

