"use client";

import PokemonCard from "@/component/Card/pokemoncard";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Container,
  SimpleGrid,
  Loader,
  Center,
} from "@mantine/core";
import SearchBar from "@/component/Search/search";
import FilterButton from "@/component/Filter/filter";
import { PokemonMainData } from "@/utils/pokemonDataType";
import { FetchPokemon } from "@/utils/pokemonFetch";

export default function Home() {
  const [pokemonData, setPokemonData] = useState<PokemonMainData[]>([]);
  const [filteredData, setFilteredData] = useState<PokemonMainData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        const data = await FetchPokemon();
        if (data.length === 0) {
          setError("Failed to fetch Pokemon data. Please try again.");
          setIsLoading(false);
        }
        setPokemonData(data);
        setFilteredData(data);
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    const searchData = pokemonData.filter((item) => {
      const searchName = item.name.toLowerCase().includes(query.toLowerCase());
      const searchType = item.types.some((type) =>
        type.toLowerCase().includes(query.toLowerCase())
      );

      if (!searchName && searchType) {
        return setError("Not Found");
      }
      return searchName || searchType;
    });
    setFilteredData(searchData);
  };

  const handleTypeFilter = (selectedType: string) => {
    setError(null);
    if (selectedType === "All") {
      setFilteredData(pokemonData);
    } else {
      const filteredByType = pokemonData.filter((pokemon) =>
        pokemon.types.includes(selectedType.toLowerCase())
      );
      if (filteredByType.length === 0) {
        setError("No Existing Type");
      }
      setFilteredData(filteredByType);
    }
  };

  return (
    <Container>
      <Container px="xl" size="30rem" h="50" mt={"md"}>
        <Text size={"2rem"} ta="center">
          Pokedex Data
        </Text>
      </Container>

      <Box my="sm">
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <SearchBar onSearch={handleSearch} />
          <FilterButton onTypeSelect={handleTypeFilter} />
        </Flex>
      </Box>
      {isLoading ? (
        <Center p={400}>
          <Loader color="gray" />;
        </Center>
      ) : error ? (
        <Text size="lg" ta="center" c="red">
          {error}
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} m="lg">
          {filteredData.map((data, index) => (
            <Box key={index} my="sm">
              <PokemonCard name={data.name} types={data.types} id={data.id} />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
