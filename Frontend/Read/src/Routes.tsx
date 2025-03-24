import { RouteObject } from "react-router-dom";
import MainPage from "#project/src/components/MainPage";
import { LogIn, SignIn } from "#project/src/components/AccountPage";
import PostPage from "#project/src/components/PostPage";
import { ErrorPage } from "./components/ErrorPage";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <MainPage/>,
		errorElement: <ErrorPage/>,
	},
	{
		path: "/log-in",
		element: <LogIn/>
	},
	{
		path: "/sign-in",
		element: <SignIn/>
	},
	{
		path: "/post/:postId",
		element: <PostPage/>
	}
];

export default routes;