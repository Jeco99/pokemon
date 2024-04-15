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
  Group,
  Button,
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsperpage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        const offset = (currentPage - 1) * itemsperpage;
        const data = await FetchPokemon(offset, itemsperpage);
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
  }, [currentPage]);

  const totalPages = Math.ceil(100 / itemsperpage);
  const handleSearch = (query: string) => {
    setError(null);
    const searchData = pokemonData.filter((item) => {
      const searchName = item.name.toLowerCase().includes(query.toLowerCase());
      const searchType = item.types.some((type) =>
        type.toLowerCase().includes(query.toLowerCase())
      );

      // if (!searchName && !searchType) {
      //   setError("Not Found");
      // }

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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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

      <Group>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </Button>
      </Group>
    </Container>
  );
}
