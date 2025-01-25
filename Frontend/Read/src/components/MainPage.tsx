import {
	Flex,
	Text,
	Button,
	Card,
	Section,
	Heading,
	Box,
	Container,
} from "@radix-ui/themes";
import { MainPageProps } from "#types/types";
import image42 from "#assets/42Logo.jpg";


export default function MainPage({ setApperance }: MainPageProps) {
		return (
			<>
				<Card>
					<Flex justify={"between"} align={"center"}>
						<Text size={"6"}>Odin Blog</Text>
						<Box>
							<Button onClick={() => setApperance("light")}>Theme</Button>
							<Button size={"3"}>Sign in</Button>
							<Button size={"3"} variant="surface">Log in</Button>
						</Box>
					</Flex>
				</Card>
				<Section>
					<Flex align={"start"}>
						<Container size={"2"}>
							<Box flexGrow={"1"}>
								<Flex direction={"column"} gap={"2"}>
									<Heading as="h1" size={"8"}>Welcome to the <Text color="teal" weight={"bold"}>Odin Blog</Text></Heading>
									<Text size={"6"} as="p" wrap={"wrap"}>This is my first blog made with Reactjs as the front-end and Expressjs in the backend </Text>
								</Flex>
							</Box>
						</Container>
						<Container size={"2"}>
							<img src={image42} alt="42Malaga logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
						</Container>
					</Flex>
				</Section>
			</>
		);
	}