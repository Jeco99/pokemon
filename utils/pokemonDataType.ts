export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonMainData = {
  name: string;
  types: string[];
  id: string;
};

export type SearchDataProp = {
  onSearch: (query: string) => void;
};

export type FilteredButtonProps = {
  onTypeSelect: (selectedType: string) => void;
};

export type IndividualPokemonData = {
  id: string;
  name: string;
  types: string[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: string[];
};
