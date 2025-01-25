import {
  Theme,
  ThemePanel,
  ThemeProps,
} from "@radix-ui/themes";

import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import routes from './Routes.tsx';
import { useState } from "react";
import { IThemeContextChild } from "#types/types.ts";
import { ThemeProvider } from "#context/context.tsx";

const router = createBrowserRouter(routes);

export default function App() {
  const [appearance, setAppearance] = useState<ThemeProps['appearance']>("dark");
  return (
    <>
      <Theme accentColor="teal" grayColor="olive" scaling="95%" appearance={appearance}>
        <ThemeContext appearance={appearance} setAppearance={setAppearance}>
          <RouterProvider router={router}></RouterProvider>
        </ThemeContext>
        <ThemePanel />
      </Theme>
    </>
  );

}

function ThemeContext({ children, appearance, setAppearance }: IThemeContextChild) {
  return (
    <ThemeProvider.Provider value={{ appearance, setAppearance }}>
      {children}
    </ThemeProvider.Provider>
  );
}