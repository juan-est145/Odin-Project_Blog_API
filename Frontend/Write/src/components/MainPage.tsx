import { useAuth } from "#project/src/Context";
import { Divider } from "primereact/divider";
import { MenuItem } from "primereact/menuitem";
import { CommentsSection } from "./CommentEditor";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";
import { PostCreator } from "./PostCreator";
import { PostEditor } from "./PostEditor";

export default function MainPage() {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const items: MenuItem[] = [
		{ label: "Your comments", icon: "pi pi-comments" },
		{ label: "Create a new post", icon: "pi pi-file-edit" },
		{ label: "Your posts", icon: "pi pi-file" },
	];
	const components: JSX.Element[] = [
		<CommentsSection />,
		<PostCreator/>,
		<PostEditor/>
	];

	const { loggedIn } = useAuth();
	return (
		<>
			{loggedIn ? <h1>You are logged in</h1> : <h1>You are not logged in</h1>}
			<TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}></TabMenu>
			<Divider />
			{components[activeIndex]}
		</>
	);
}
