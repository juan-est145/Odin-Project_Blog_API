import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import apiClient from "../APiClient";
import { Toast } from "primereact/toast";

export function UpgradeAccnt() {
	const [value, setValue] = useState<string>("");
	const passcodeId = "passcode";
	const toast = useRef<Toast>(null);

	async function upgradeAccnt() {
		try {
			const { data, error } = await apiClient.POST("/v1/accnt/upgrade", {
				body: { passCode: value }
			});
			if (data)
				return window.location.reload();
			console.error(error);
			return toast.current?.show({ severity: "error", summary: "Invalid passcode" })
		} catch {
			alert("Something went wrong, please try again at a later time");
		}

	}

	return (
		<>
			<h1>Enter the secret passcode to become a poster</h1>
			<FloatLabel>
				<InputText value={value} id={passcodeId} onChange={(e) => setValue(e.target.value)} ></InputText>
				<label htmlFor={passcodeId}>Passcode</label>
				<Button onClick={async () => await upgradeAccnt()}>Submit</Button>
			</FloatLabel>
			<Toast ref={toast}></Toast>
		</>
	);
}