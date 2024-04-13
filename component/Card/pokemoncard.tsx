import { Card, Image, Text, Button, Title, Center } from "@mantine/core";
import { PokemonMainData } from "@/utils/pokemonDataType";

export default function PokemonCard({ name, types, id }: PokemonMainData) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          radius="md"
          h={200}
          w="auto"
          fit="contain"
        />
      </Card.Section>

      <Center>
        <Title order={1}>{name}</Title>
      </Center>

      <Title order={3}>Type</Title>
      {types.map((type, typeIndex) => (
        <Text key={typeIndex} size="sm" c="dimmed">
          {type}
        </Text>
      ))}
      <Text size="sm" c="dimmed">
        {/* {types.map} */}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}
