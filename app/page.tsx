"use client";

import PokemonCard from "@/component/pokemoncard";

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonMainData = {
  name: string;
  types: string[];
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
  const pokemonFetchData = await fetch(url).then((response) => response.json());
  const pokemonData = pokemonFetchData;
  // console.log(pokemonData.name);
  // // console.log(pokemonData.types.name);
  const pokemon: PokemonMainData = {
    name: pokemonData.name,
    types: pokemonData.types.map(
      (typeInfo: { type: { name: string } }) => typeInfo.type.name
    ),
  };

  return pokemon;
}

export default function Home() {
  console.log(FetchPokemon());
  return (
    <>
      <PokemonCard />
    </>
  );
}
