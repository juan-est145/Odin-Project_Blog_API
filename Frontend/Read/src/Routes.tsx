import { RouteObject } from "react-router-dom";
import MainPage from "#components/MainPage";
import { LogIn, SignIn } from "#components/AccountPage";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <MainPage/>,
	},
	{
		path: "/log-in",
		element: <LogIn/>
	},
	{
		path: "/sign-in",
		element: <SignIn/>
	}
];

export default routes;