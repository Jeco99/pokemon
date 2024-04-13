import { PokemonMainData, Pokemon } from "./pokemonDataType";

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
  //   console.log(pokemonData);
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
