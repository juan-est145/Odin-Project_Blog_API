import { RouteObject } from "react-router";
import MainPage from "./components/MainPage";
import { LogIn } from "./components/LogInPage";
import { ErrorPage } from "./components/ErrorPage";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <MainPage />,
		errorElement: <ErrorPage/>
	},
	{
		path: "/log-in",
		element: <LogIn/>
	}
];

export default routes;