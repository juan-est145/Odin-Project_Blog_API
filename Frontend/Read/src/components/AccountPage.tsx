import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";


export function LogIn() {
	return (
		<>
			<main className="flex min-h-screen flex-column justify-content-center align-items-center bg-gray-700">
				<Card title={<h3 style={{ margin: 0, textAlign: "center" }}>Log in</h3>}>
					<div className="flex flex-column gap-4">
						<FloatLabel>
							<InputText className="min-w-full" id={"username"} />
							<label htmlFor="username">Username</label>
						</FloatLabel>
						<FloatLabel>
							<Password className="min-w-full" inputId="password" toggleMask feedback={false}/>
							<label htmlFor="password">Password</label>
						</FloatLabel>
						<Button className="align-self-center">Log in</Button>
					</div>
				</Card>
			</main>
		</>
	);
}