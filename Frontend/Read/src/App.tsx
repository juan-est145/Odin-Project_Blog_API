import { Flex, Text, Button, Card, Section, Heading, Box } from "@radix-ui/themes";
import image42 from "#assets/42Logo.jpg";

export default function App() {

  return (
    <>
      <Card>
        <Flex justify={"between"} align={"center"}>
          <Text size={"6"}>Odin Blog</Text>
          <Button>Sign in</Button>
        </Flex>
      </Card>
      <Section>
        <Flex>
          <Box>
            <Heading as="h1" size={"8"}>Welcome to the Odin Blog</Heading>
            <Text size={"6"} as="p">This is my first blog made with Reactjs as the front-end and Expressjs in the backend </Text>
          </Box>
          <Box>
            <img src={image42} alt="Image with the logo of 42 Malaga" />
          </Box>
        </Flex>
      </Section>
    </>
  );
}
