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
  const [color] = useState<ThemeProps["accentColor"]>("teal");
  // TO DO: Try with useEffect to store appearance preference in local storage
  return (
    <>
      <Theme accentColor={color} grayColor="olive" scaling="95%" appearance={appearance}>
        <ThemeContext appearance={appearance} setAppearance={setAppearance} accentColor={color}>
          <RouterProvider router={router}></RouterProvider>
        </ThemeContext>
        <ThemePanel />
      </Theme>
    </>
  );

}

function ThemeContext({ children, appearance, setAppearance, accentColor }: IThemeContextChild) {
  return (
    <ThemeProvider.Provider value={{ appearance, setAppearance, accentColor }}>
      {children}
    </ThemeProvider.Provider>
  );
}