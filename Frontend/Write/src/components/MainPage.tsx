import { useAuth } from "#project/src/Context";

export default function MainPage() {
	const { loggedIn } = useAuth();
	return (
		<>
			{loggedIn ? <h1>You are logged in</h1> : <h1>You are not logged in</h1>}
		</>
	)
}