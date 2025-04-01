import { Divider } from "primereact/divider";
import { Editor } from "primereact/editor";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { useState, Dispatch, SetStateAction, useRef } from "react";
import { BoolString, isPostResponse } from "../types/types";
import { InputText } from "primereact/inputtext";
import apiClient from "../APiClient";
import { FloatLabel } from "primereact/floatlabel";
import { Toast, ToastMessage } from "primereact/toast";

export function PostCreator() {
	const [title, setTitle] = useState<string>("");
	const [subtitle, setSubtitle] = useState<string>();
	const [text, setText] = useState<string>("");
	const items: MenuItem[] = [
		{ label: "Publish", icon: "pi pi-check", command: () => alert("Nothing yet") }
	];
	const toast = useRef<Toast>(null);

	async function createPost(publish: BoolString) {
		const { data, error } = await apiClient.POST("/v1/accnt/posts",
			{ body: { title, subtitle, text: text.substring(0, text.length - 1), publish } }
		);
		return data ? data : error;
	}

	async function savePost() {
		const result = await createPost("false");
		if (isPostResponse(result)) {
			return toast.current?.show({ severity: "success", summary: "The post was created sucessfully" });
		}
		const toastOpts: ToastMessage[] = result.message instanceof Array ?
			result.message.map((element) => Object.assign({}, { severity: "error", summary: element } as ToastMessage)) :
			[{ severity: "error", summary: result.message }];
		return toast.current?.show(toastOpts);
	}

	return (
		<>
			<Toast ref={toast}></Toast>
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
				model={items}
				onClick={async () => savePost()}></SplitButton>
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