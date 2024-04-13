"use client";

import PokemonCard from "@/component/Card/pokemoncard";
import { useEffect, useState } from "react";
import { SimpleGrid, Text } from "@mantine/core";
import SearchBar from "@/component/Search/search";

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonMainData = {
  name: string;
  types: string[];
  id: string;
};

export async function FetchPokemon() {
  // const PokemonList: PokemonMainData[] = []
  const url = "https://pokeapi.co/api/v2/pokemon?limit=10";
  const pokemonAllData = await fetch(url).then((response) => response.json());
  const fetchName_Url = pokemonAllData.results;
  const PokemonList: PokemonMainData[] = [];
  await Promise.all(
    fetchName_Url.map(async ({ url }: Pokemon) => {
      // console.log("Name: ", name);
      // console.log("Url: ", url);
      const pokemon = await GetIndividualPokemonData(url);
      PokemonList.push(pokemon);
    })
  );
  // console.log(allFetchData);
  return PokemonList;
}

export async function GetIndividualPokemonData(url: string) {
  const pokemonData = await fetch(url).then((response) => response.json());
  // const pokemonData = pokemonFetchData;
  console.log(pokemonData);
  // console.log(pokemonData.name);
  // // console.log(pokemonData.types.name);
  const pokemon: PokemonMainData = {
    name: pokemonData.name,
    types: pokemonData.types.map(
      (typeInfo: { type: { name: string } }) => typeInfo.type.name
    ),
    id: pokemonData.id,
  };

  return pokemon;
}

export default function Home() {
  const [pokemonData, setPokemonData] = useState<PokemonMainData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchPokemon();
      setPokemonData(data);
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
    setPokemonData(searchData);
  };

  // console.log(pokemonData); // This will log each time `pokemonData` state changes

  return (
    <>
      <Text size="md" ta="center">
        Pokedex Data
      </Text>
      <SearchBar onSearch={handleSearch} />
      <ul>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          {pokemonData.map((data, index) => (
            <ul key={index}>
              <PokemonCard name={data.name} types={data.types} id={data.id} />
            </ul>
          ))}
        </SimpleGrid>
      </ul>{" "}
    </>
  );
}
