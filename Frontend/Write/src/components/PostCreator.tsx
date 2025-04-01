import { Divider } from "primereact/divider";
import { Editor } from "primereact/editor";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { useState, Dispatch, SetStateAction } from "react";
import { BoolString } from "../types/types";
import { InputText } from "primereact/inputtext";
import apiClient from "../APiClient";
import { FloatLabel } from "primereact/floatlabel";

export function PostCreator() {
	const [title, setTitle] = useState<string>("");
	const [subtitle, setSubtitle] = useState<string>();
	const [text, setText] = useState<string>("");
	const items: MenuItem[] = [
		{ label: "Publish", icon: "pi pi-check", command: () => alert("Nothing yet") }
	];

	async function createPost(publish: BoolString) {
		const { data, error } = await apiClient.POST("/v1/accnt/posts",
			{ body: { title, subtitle, text, publish } }
		);
		return data ? data : error;
	}

	return (
		<>
			<InputField
			id="title"
			value={title}
			onChange={setTitle}
			labelText="Title (required)"
			></InputField>
			<Divider />
			<InputField
			id="subtitle"
			value={subtitle}
			onChange={setSubtitle}
			labelText="Subtitle (optional)"
			></InputField>
			<Divider />
			<Editor
				value={text}
				onTextChange={(e) => setText(e.textValue)}
				style={{ minHeight: "300px" }}></Editor>
			<Divider />
			<SplitButton
				icon={"pi pi-save"}
				label={"Save"}
				model={items}></SplitButton>
		</>
	);
}

export function InputField<T>({ id, labelText, value, onChange }:
	{
		id: string,
		labelText: string,
		value: string | undefined,
		onChange: Dispatch<SetStateAction<T>>
	}
) {
	return (
		<>
			<FloatLabel>
				<InputText id={id} value={value} onChange={(e) => onChange(e.target.value as T)}></InputText>
				<label htmlFor={id}>{labelText}</label>
			</FloatLabel>
		</>
	);
}