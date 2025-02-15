import { RouteObject } from "react-router-dom";
import MainPage from "#components/MainPage";
import { LogIn, SignIn } from "#components/AccountPage";
import PostPage from "#components/PostPage";

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
	},
	{
		path: "/post/:postId",
		element: <PostPage/>
	}
];

export default routes;