import { Dispatch, SetStateAction } from "react";
import { ThemeProps } from "@radix-ui/themes";

export interface MainPageProps {
	setApperance: Dispatch<SetStateAction<ThemeProps["appearance"]>>;
}