"use client";

import PokemonCard from "@/component/Card/pokemoncard";
import { useEffect, useState } from "react";
import { SimpleGrid, Text } from "@mantine/core";
import SearchBar from "@/component/Search/search";
import FilterButton from "@/component/Filter/filter";
import { PokemonMainData } from "@/utils/pokemonDataType";
import { FetchPokemon } from "@/utils/pokemonFetch";

export default function Home() {
  const [pokemonData, setPokemonData] = useState<PokemonMainData[]>([]);
  const [filteredData, setFilteredData] = useState<PokemonMainData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchPokemon();
      setPokemonData(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    const searchData = pokemonData.filter((item) => {
      const searchName = item.name.toLowerCase().includes(query.toLowerCase());
      const searchType = item.types.some((type) =>
        type.toLowerCase().includes(query.toLowerCase())
      );
      return searchName || searchType;
    });
    setFilteredData(searchData);
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
    <>
      <Text size="md" ta="center">
        Pokedex Data
      </Text>
      <SearchBar onSearch={handleSearch} />
      <FilterButton onTypeSelect={handleTypeFilter} />
      <ul>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          {filteredData.map((data, index) => (
            <ul key={index}>
              <PokemonCard name={data.name} types={data.types} id={data.id} />
            </ul>
          ))}
        </SimpleGrid>
      </ul>{" "}
    </>
  );
}
