import {
  PokemonMainData,
  Pokemon,
  IndividualPokemonData,
} from "./pokemonDataType";

export async function FetchPokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=10";
  // const url = "https://pokeapi.co/api/v2/pokemonssss?limit=10";
  const pokemonData = await fetch(url, { cache: "no-cache" });

  if (pokemonData.status === 200) {
    const data = await pokemonData.json();
    const fetchName_Url = data.results;
    const PokemonList: PokemonMainData[] = [];
    await Promise.all(
      fetchName_Url.map(async ({ url }: Pokemon) => {
        const pokemon = await GetIndividualPokemonData(url);
        PokemonList.push(pokemon);
      })
    );
    return PokemonList;
  } else {
    return [];
  }
}

export async function GetIndividualPokemonData(url: string) {
  const pokemonData = await fetch(url, { cache: "no-cache" }).then((response) =>
    response.json()
  );
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
  // const url = `https://pokeapi.co/api/v2/pokemonsssss/${pokemon}/`;
  const pokemonData = await fetch(url, { cache: "no-cache" });

  if (pokemonData.status === 200) {
    const data = await pokemonData.json();
    const individualData: IndividualPokemonData = {
      id: data.id,
      name: data.name,
      types: data.types.map(
        (typeInfo: { type: { name: string } }) => typeInfo.type.name
      ),
      stats: data.stats,
      abilities: data.abilities.map(
        (abilitiesInfo: { ability: { name: string } }) =>
          abilitiesInfo.ability.name
      ),
    };
    return individualData;
  } else {
    return null;
  }
}
