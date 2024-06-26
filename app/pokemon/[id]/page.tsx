"use client";

import { useParams } from "next/navigation";
import { GetIndividualPokemonData_byId } from "@/utils/pokemonFetch";
import { useEffect, useState } from "react";
import { IndividualPokemonData } from "@/utils/pokemonDataType";
import {
  Card,
  Image,
  Text,
  Center,
  Button,
  Title,
  Container,
  AspectRatio,
  Box,
  Skeleton,
} from "@mantine/core";
import Link from "next/link";
import { capitalizeWords } from "@/utils/helper";

export default function PokemonIndividualData_By_Params() {
  const params = useParams<{ id: string }>();
  const pokemonId: string | undefined = params?.id;
  const [pokemonData, setPokemonData] =
    useState<IndividualPokemonData | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        const response = await GetIndividualPokemonData_byId(pokemonId);
        if (response === null) {
          setError("Failed to fetch Pokemon data. Please try again.");
          setIsLoading(false);
        }
        setPokemonData(response);
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, [pokemonId]);

  console.log(pokemonData);

  return (
    <Container mt="xl">
      {isLoading ? (
        <>
          <Skeleton height={50} circle mb="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </>
      ) : error ? (
        <Text size="lg" ta="center" c="red">
          {error}
        </Text>
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <AspectRatio ratio={1080 / 720} maw={300} mx="auto">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData?.id}.png`}
                alt={pokemonData?.name}
                radius="md"
                h="100%"
                w="auto"
                fit="contain"
                mx="auto"
              />
            </AspectRatio>
          </Card.Section>

          <Center>
            <Title order={1}>{capitalizeWords(pokemonData?.name)}</Title>
          </Center>

          <Title order={3}>Type</Title>
          {pokemonData?.types.map((type, typeIndex) => (
            <Text key={typeIndex} size="md" pl={30}>
              {type}
            </Text>
          ))}

          <Title order={3}>Abilities</Title>
          {pokemonData?.abilities.map((abilities, abilitiesIndex) => (
            <Text key={abilitiesIndex} size="md" pl={30}>
              {abilities}
            </Text>
          ))}

          <Title order={3}>Stats</Title>
          {pokemonData?.stats.map((stat, statIndex) => (
            <Box key={statIndex} my={2} pl={30}>
              <Text size="md">Name: {stat.stat.name}</Text>
              <Text size="md">Base Stat: {stat.base_stat}</Text>
            </Box>
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
      )}
    </Container>
  );
}
