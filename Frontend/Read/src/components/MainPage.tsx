import {
	Flex,
	Text,
	Button,
	Card,
	Section,
	Heading,
	Box,
	Container,
	ThemeProps,
	IconButton,
	Separator,
	Link
} from "@radix-ui/themes";
import image42 from "#assets/42Logo.jpg";
import { useThemeContext } from "#context/context";
import { MoonIcon, SunIcon, GitHubLogoIcon } from "@radix-ui/react-icons";


export default function MainPage() {
	return (
		<>
			<Header></Header>
			<Presentation></Presentation>
			<Separator size={"4"} />
		</>
	);
}

function Header() {
	const { appearance, setAppearance } = useThemeContext();
	function toggleAppearance(appearance: ThemeProps['appearance'], setAppearance: React.Dispatch<React.SetStateAction<ThemeProps['appearance']>>) {
		setAppearance(appearance === "light" ? "dark" : "light");
	}

	return (
		<Card>
			<Flex justify={"between"} align={"center"}>
				<Heading size={"8"}>Odin Blog</Heading>
				<Box>
					<Flex gap={"3"}>
						<IconButton variant={"soft"} size={"3"} onClick={() => toggleAppearance(appearance, setAppearance)}>
							{appearance === "light" ? <SunIcon /> : <MoonIcon />}
						</IconButton>
						<Button size={"3"}>Sign in</Button>
						<Link href="/log-in">
							<Button size={"3"} variant="surface">Log in</Button>
						</Link>
					</Flex>
				</Box>
			</Flex>
		</Card>
	);
}

function Presentation() {
	const { accentColor } = useThemeContext();
	return (
		<Section py={"5"}>
			<Flex align={"start"}>
				<Box flexGrow={"1"} p={"6"}>
					<Flex direction={"column"} gap={"2"}>
						<Heading as="h1" size={"9"}>Welcome to the </Heading>
						<Heading color={accentColor} weight={"bold"} size={"9"}>Odin Blog</Heading>
						<Text size={"6"} as="p">
							A blog created with a REST API on the backend and React on the front-end
						</Text>
						<Link href="https://github.com/juan-est145">
							<Button variant={"surface"} size={"3"}><GitHubLogoIcon />Github</Button>
						</Link>
					</Flex>
				</Box>
				<Container size={"2"}>
					<img src={image42} alt="42Malaga logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
				</Container>
			</Flex>
		</Section>
	);
}

