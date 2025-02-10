import axios, { AxiosResponse } from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// TO DO: For input validation use Toast

export function LogIn() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const redirect = useNavigate();

	async function postLogin() {
		try {
			const token: AxiosResponse<string, { username: string, password: string }> = await axios.post(
				"http://localhost:3000/account/log-in",
				{ username, password },
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } });
			if (token.status !== 200) // TO DO: Implement better handlers for invalid credentials
				throw new Error("Invalid credentials");
			localStorage.setItem("jwt", token.data);
			redirect("/");
		} catch (error) {
			// Temporal meausre
			console.error(error);
		}
	}

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
						<span className="align-self-center">
							Don't have an account? <Link to={"/sign-in"} style={{ color: "var(--primary-color)" }}>Sign in</Link>
						</span>
						<Button className="align-self-center" onClick={async () => await postLogin()}>Log in</Button>
					</div>
				</Card>
			</main>
		</>
	);
}