import { useAuth } from "#project/src/Context";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";

export default function MainPage() {
	const items: MenuItem[] = [
		{ label: "Your comments" },
		{ label: "Your posts" },
		{ label: "Create a new post" },
	];

	const { loggedIn } = useAuth();
	return (
		<>
			{loggedIn ? <h1>You are logged in</h1> : <h1>You are not logged in</h1>}
			<TabMenu model={items}></TabMenu>
		</>
	)
}