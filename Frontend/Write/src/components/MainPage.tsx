import { useAuth } from "#project/src/Context";
import { Divider } from "primereact/divider";
import { MenuItem } from "primereact/menuitem";
import { CommentsSection } from "./CommentEditor";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";
import { PostCreator } from "./PostCreator";
import { PostEditor } from "./PostEditor";
import { UpgradeAccnt } from "./UpgradeAccount";

export default function MainPage() {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const posterItems: MenuItem[] = [
		{ label: "Your comments", icon: "pi pi-comments" },
		{ label: "Create a new post", icon: "pi pi-file-edit" },
		{ label: "Your posts", icon: "pi pi-file" },
	];
	const userItems: MenuItem[] = [
		{ label: "Your comments", icon: "pi pi-comments" },
		{ label: "Upgrade your account", icon: "pi pi-users-plus" },
	]
	const { loggedIn } = useAuth();
	const posterMenu: JSX.Element[] = [
		<CommentsSection />,
		<PostCreator/>,
		<PostEditor/>
	];
	const userMenu: JSX.Element[] = [
		<CommentsSection/>,
		<UpgradeAccnt/>
	];
	return (
		<>
			<TabMenu model={loggedIn? posterItems : userItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}></TabMenu>
			<Divider />
			{ posterMenu[activeIndex]}
		</>
	);
}
