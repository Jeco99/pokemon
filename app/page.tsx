"use client";

import PokemonCard from "@/component/Card/pokemoncard";
import { useEffect, useState } from "react";
import { Box, Flex, Text, Container, SimpleGrid } from "@mantine/core";
import SearchBar from "@/component/Search/search";
import FilterButton from "@/component/Filter/filter";
import { PokemonMainData } from "@/utils/pokemonDataType";
import { FetchPokemon } from "@/utils/pokemonFetch";

export default function Home() {
  const [pokemonData, setPokemonData] = useState<PokemonMainData[]>([]);
  const [filteredData, setFilteredData] = useState<PokemonMainData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchPokemon();
      setPokemonData(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setLoading(true);
    const searchData = pokemonData.filter((item) => {
      const searchName = item.name.toLowerCase().includes(query.toLowerCase());
      const searchType = item.types.some((type) =>
        type.toLowerCase().includes(query.toLowerCase())
      );
      return searchName || searchType;
    });
    setFilteredData(searchData);
    setLoading(false);
  };

  const handleTypeFilter = (selectedType: string) => {
    if (selectedType === "All") {
      setFilteredData(pokemonData);
    } else {
      const filteredByType = pokemonData.filter((pokemon) =>
        pokemon.types.includes(selectedType.toLowerCase())
      );
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
          <SearchBar onSearch={handleSearch} loading={loading} />
          <FilterButton onTypeSelect={handleTypeFilter} />
        </Flex>
      </Box>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} m="lg">
        {filteredData.map((data, index) => (
          <Box key={index} my="sm">
            <PokemonCard name={data.name} types={data.types} id={data.id} />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
