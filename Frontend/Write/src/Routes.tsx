import { RouteObject } from "react-router";
import MainPage from "./components/MainPage";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <MainPage/>
	}
]

export default routes;