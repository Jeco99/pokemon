import {
  Card,
  Image,
  Text,
  Button,
  Title,
  Center,
  AspectRatio,
} from "@mantine/core";
import { PokemonMainData } from "@/utils/pokemonDataType";
import Link from "next/link";
import { capitalizeWords } from "@/utils/helper";

export default function PokemonCard({ name, types, id }: PokemonMainData) {
  return (
    <Card shadow="sm" h="100%" w="100%" padding="lg" radius="md" withBorder>
      <Card.Section>
        <AspectRatio ratio={1080 / 720} maw={300} mx="auto">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={name}
            radius="md"
            h="100%"
            w="auto"
            fit="contain"
            mx="auto"
          />
        </AspectRatio>
      </Card.Section>

      <Center>
        <Title order={1} m="md">
          {capitalizeWords(name)}
        </Title>
      </Center>

      <Title order={3}>Type</Title>
      {types.map((type, typeIndex) => (
        <Text key={typeIndex} size="lg" pl={30}>
          {type}
        </Text>
      ))}

      <Link
        href={`/pokemon/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <Button color="blue" fullWidth radius="md" mt={10}>
          More details {capitalizeWords(name)}
        </Button>
      </Link>
    </Card>
  );
}
