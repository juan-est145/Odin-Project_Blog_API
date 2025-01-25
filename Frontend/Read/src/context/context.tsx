import { createContext, useContext } from "react";
import { IThemeState } from "#types/types";

export const ThemeProvider: React.Context<IThemeState | undefined> = createContext<IThemeState | undefined>(undefined);

export function useThemeContext() {
	const context = useContext(ThemeProvider);
	if (!context)
		throw new Error("useMainPageContext must be used with MainPageContext");
	return (context);
}