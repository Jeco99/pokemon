"use client";

import { useParams } from "next/navigation";
import { GetIndividualPokemonData_byId } from "@/utils/pokemonFetch";
import { useEffect, useState } from "react";
import { IndividualPokemonData } from "@/utils/pokemonDataType";
import { Card, Image, Text, Center, Button, Title } from "@mantine/core";
import Link from "next/link";

export default function PokemonIndividualData_By_Params() {
  const params = useParams<{ id: string }>();
  const pokemonId: string | undefined = params?.id;
  const [pokemonData, setPokemonData] = useState<IndividualPokemonData>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetIndividualPokemonData_byId(pokemonId);
      setPokemonData(response);
    };
    fetchData();
  }, [pokemonId]);

  console.log(pokemonData);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData?.id}.png`}
          alt={pokemonData?.name}
          radius="md"
          h={200}
          w="auto"
          fit="contain"
        />
      </Card.Section>

      <Center>
        <Title order={1}>{pokemonData?.name}</Title>
      </Center>

      <Title order={3}>Type</Title>
      {pokemonData?.types.map((type, typeIndex) => (
        <Text key={typeIndex} size="sm" c="dimmed">
          {type}
        </Text>
      ))}

      <Title order={3}>Abilities</Title>
      {pokemonData?.abilities.map((abilities, abilitiesIndex) => (
        <Text key={abilitiesIndex} size="sm" c="dimmed">
          {abilities}
        </Text>
      ))}

      <Title order={3}>Stats</Title>
      {pokemonData?.stats.map((stat, statIndex) => (
        <>
          <Text key={statIndex} size="sm" c="dimmed">
            Namet: {stat.stat.name}
          </Text>
          <Text key={statIndex} size="sm" c="dimmed">
            Base Stat: {stat.base_stat}
          </Text>
        </>
      ))}
      <Link
        href={`/`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <Button color="blue" fullWidth mt="md" radius="md">
          Go Back to the Homepage
        </Button>
      </Link>
    </Card>
  );
}
