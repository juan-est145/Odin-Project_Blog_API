import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// TO DO: For input validation use Toast

export function LogIn() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate: NavigateFunction = useNavigate();

	return (
		<>
			<main className="flex min-h-screen flex-column justify-content-center align-items-center bg-gray-700">
				<Card title={<h3 style={{ margin: 0, textAlign: "center" }}>Log in</h3>}>
					<div className="flex flex-column gap-4">
						<FloatLabel>
							<InputText
								name={"username"}
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="min-w-full"
								id={"username"}
								required />
							<label htmlFor="username">Username</label>
						</FloatLabel>
						<FloatLabel>
							<Password
								value={password}
								name={"password"}
								onChange={(e) => setPassword(e.target.value)}
								className="min-w-full" inputId="password"
								toggleMask
								feedback={false}
								required />
							<label htmlFor="password">Password</label>
						</FloatLabel>
						<span className="flex align-items-center justify-content-center gap-1">
							Don't have an account? <Button className="p-2" link onClick={() => navigate("/sign-in")}>Sign in</Button>
						</span>
						<Button className="align-self-center">Log in</Button>
					</div>
				</Card>
			</main>
		</>
	);
}