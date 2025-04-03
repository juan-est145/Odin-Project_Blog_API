import { RouteObject } from "react-router";
import MainPage from "./components/MainPage";
import { LogIn } from "./components/LogInPage";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <MainPage />
	},
	{
		path: "/log-in",
		element: <LogIn/>
	}
];

export default routes;