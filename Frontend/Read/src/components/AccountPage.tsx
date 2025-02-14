import axios, { AxiosError, AxiosResponse } from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LogIn() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const redirect = useNavigate();
	const toast = useRef<Toast>(null);

	async function postLogin() {
		try {
			const token: AxiosResponse<string, { username: string, password: string }> = await axios.post(
				"http://localhost:3000/account/log-in",
				{ username, password },
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } });
			localStorage.setItem("jwt", token.data);
			redirect("/");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response) {
					return toast.current?.show({ severity: "error", summary: "Error", detail: error.response.data });
				}
				else if (error.request)
					return toast.current?.show({ severity: "error", summary: "Error", detail: "Something went wrong, please try at a later time" })
			}
			console.error(error);
		}
	}

	useEffect(() => {
		const token: string | null = localStorage.getItem("jwt");
		if (token)
			redirect("/");
	}, [redirect]);

	return (
		<>
			<main className="flex min-h-screen flex-column justify-content-center align-items-center bg-gray-700">
				<Card title={<h3 style={{ margin: 0, textAlign: "center" }}>Log in</h3>}>
					<div className="flex flex-column gap-4">
						<Toast ref={toast} />
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

export function SignIn() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const redirect = useNavigate();
	const toast = useRef<Toast>(null);

	async function postSignIn() {
		try {
			await axios.post(
				"http://localhost:3000/account/sign-in",
				{ username, password },
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } });
			redirect("/");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response) {
					const messages = error.response.data;
					return toast.current?.show(messages.map((element: any) => {
						return { severity: "error", summary: "Error", detail: element.msg }
					}));
				}
				else if (error.request)
					return toast.current?.show({ severity: "error", summary: "Error", detail: "Something went wrong, please try at a later time" })
			}
			console.error(error);
		}
	}

	useEffect(() => {
		const token: string | null = localStorage.getItem("jwt");
		if (token)
			redirect("/");
	}, [redirect]);

	return (
		<>
			<main className="flex min-h-screen flex-column justify-content-center align-items-center bg-gray-700">
				<Card title={<h3 style={{ margin: 0, textAlign: "center" }}>Sign in</h3>}>
					<div className="flex flex-column gap-4">
						<Toast ref={toast} />
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
							Already have an account? <Link to={"/log-in"} style={{ color: "var(--primary-color)" }}>Log in</Link>
						</span>
						<Button className="align-self-center" onClick={async () => await postSignIn()}>Sign in</Button>
					</div>
				</Card>
			</main>
		</>
	);
}