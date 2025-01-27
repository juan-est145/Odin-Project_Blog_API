import { Button, Card, Heading, TextField, Flex, Box } from "@radix-ui/themes";
import { useState } from "react";

export function LogIn() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	return (
		<Box className="Container" minHeight={"100vh"}>
			<Flex justify={"center"} align={"center"}>
				<Card>
					<Box>
						<Heading>Log in</Heading>
						<TextField.Root
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)} />
						<TextField.Root
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)} />
						<Button>Sumbit</Button>
					</Box>
				</Card>
			</Flex>
		</Box>
	);
}