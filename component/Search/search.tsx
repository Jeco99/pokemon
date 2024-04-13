import { SearchDataProp } from "@/utils/pokemonDataType";
import React, { ChangeEvent, useState } from "react";
import { TextInput } from "@mantine/core";

const SearchBar: React.FC<SearchDataProp> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearch(searchQuery);
    onSearch(searchQuery);
  };
  return (
    <>
      <h1>Search</h1>
      <TextInput
        label="Search Pokemon"
        value={search}
        onChange={handleChange}
      />
    </>
  );
};

export default SearchBar;
