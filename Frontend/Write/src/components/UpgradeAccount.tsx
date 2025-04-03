import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export function UpgradeAccnt() {
	const [value, setValue] = useState<string>("");
	const passcodeId = "passcode";

	return (
		<>
			<h1>Enter the secret passcode to become a poster</h1>
			<FloatLabel>
				<InputText id={passcodeId}></InputText>
				<label htmlFor={passcodeId}>Passcode</label>
			</FloatLabel>

		</>
	);
}