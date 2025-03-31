import { Divider } from "primereact/divider";
import { Editor } from "primereact/editor";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { useState } from "react";

export function PostCreator() {
	const [text, setText] = useState<string>("");

	const items: MenuItem[] = [
		{ label: "Publish", icon: "pi pi-check", command: () => alert("Nothing yet") }
	];

	return (
		<>
			<Editor
			value={text}
			onTextChange={(e) => setText(e.textValue)}
			style={{ minHeight: "300px" }}></Editor>
			<Divider/>
			<SplitButton 
			icon={"pi pi-save"} 
			label={"Save"}
			model={items}></SplitButton>
		</>
	);
}