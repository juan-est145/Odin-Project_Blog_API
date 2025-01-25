import { Dispatch, SetStateAction } from "react";
import { ThemeProps } from "@radix-ui/themes";
import { ReactNode } from "react";

export interface IThemeState {
	setAppearance: Dispatch<SetStateAction<ThemeProps["appearance"]>>;
	appearance: ThemeProps["appearance"];
}

export interface IThemeContextChild extends IThemeState {
    children: ReactNode;
}