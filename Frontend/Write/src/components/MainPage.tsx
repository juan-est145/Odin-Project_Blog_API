import { useAuth } from "#project/src/Context";
import { Divider } from "primereact/divider";
import { MenuItem } from "primereact/menuitem";
import { CommentsSection } from "./CommentEditor";
import { TabMenu } from "primereact/tabmenu";
import { useEffect, useState } from "react";
import { PostCreator } from "./PostCreator";
import { PostEditor } from "./PostEditor";
import { UpgradeAccnt } from "./UpgradeAccount";
import apiClient from "../APiClient";
import { AccntStatus } from "../types/types";
import { NavigateFunction, useNavigate } from "react-router";

export default function MainPage() {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [accntStatus, setAccntStatus] = useState<AccntStatus>("USER");
	const { loggedIn } = useAuth();
	const redirect: NavigateFunction = useNavigate();

	useEffect(() => {
		if (!loggedIn) {
			redirect("/log-in");
		}
		else {
			const promise = apiClient.GET("/v1/accnt/upgrade");
			promise.then((element) => setAccntStatus(element.data?.role ?? "USER"))
				.catch(() => alert("Something went wrong, please try again at a later time"));
		}

	}, [loggedIn, redirect])
	const posterItems: MenuItem[] = [
		{ label: "Your comments", icon: "pi pi-comments" },
		{ label: "Create a new post", icon: "pi pi-file-edit" },
		{ label: "Your posts", icon: "pi pi-file" },
	];
	const userItems: MenuItem[] = [
		{ label: "Your comments", icon: "pi pi-comments" },
		{ label: "Upgrade your account", icon: "pi pi-users-plus" },
	]
	const posterMenu: JSX.Element[] = [
		<CommentsSection />,
		<PostCreator />,
		<PostEditor />
	];
	const userMenu: JSX.Element[] = [
		<CommentsSection />,
		<UpgradeAccnt />
	];
	return (
		<>
			<TabMenu model={accntStatus === "POSTER" ? posterItems : userItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}></TabMenu>
			<Divider />
			{accntStatus === "POSTER" ? posterMenu[activeIndex] : userMenu[activeIndex]}
		</>
	);
}
