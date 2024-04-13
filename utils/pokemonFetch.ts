import {
  PokemonMainData,
  Pokemon,
  IndividualPokemonData,
} from "./pokemonDataType";

export async function FetchPokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=10";
  const pokemonAllData = await fetch(url).then((response) => response.json());
  const fetchName_Url = pokemonAllData.results;
  const PokemonList: PokemonMainData[] = [];
  await Promise.all(
    fetchName_Url.map(async ({ url }: Pokemon) => {
      const pokemon = await GetIndividualPokemonData(url);
      PokemonList.push(pokemon);
    })
  );
  return PokemonList;
}

export async function GetIndividualPokemonData(url: string) {
  const pokemonData = await fetch(url).then((response) => response.json());
  const pokemon: PokemonMainData = {
    name: pokemonData.name,
    types: pokemonData.types.map(
      (typeInfo: { type: { name: string } }) => typeInfo.type.name
    ),
    id: pokemonData.id,
  };
  return pokemon;
}

export async function GetIndividualPokemonData_byId(
  pokemon: string | undefined
) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
  const pokemonData = await fetch(url).then((response) => response.json());
  const individualData: IndividualPokemonData = {
    id: pokemonData.id,
    name: pokemonData.name,
    types: pokemonData.types.map(
      (typeInfo: { type: { name: string } }) => typeInfo.type.name
    ),
    stats: pokemonData.stats,
    abilities: pokemonData.abilities.map(
      (abilitiesInfo: { ability: { name: string } }) =>
        abilitiesInfo.ability.name
    ),
  };
  return individualData;
}
