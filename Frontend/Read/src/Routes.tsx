import { RouteObject } from "react-router-dom";
import MainPage from "#components/MainPage";
import { LogIn } from "#components/AccountPage";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <MainPage/>,
	},
	{
		path: "/log-in",
		element: <LogIn/>
	}
];

export default routes;