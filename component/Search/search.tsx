import { SearchDataProp } from "@/utils/pokemonDataType";
import React, { ChangeEvent, useState } from "react";
import { TextInput, Loader } from "@mantine/core";

const SearchBar: React.FC<SearchDataProp> = ({ onSearch, loading }) => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearch(searchQuery);
    onSearch(searchQuery);
  };
  return (
    <>
      <TextInput
        variant="filled"
        size="lg"
        radius="md"
        label="Search Pokemon"
        placeholder="Type of name or type"
        value={search}
        onChange={handleChange}
        rightSection={loading && <Loader size={20} />}
      />
    </>
  );
};

export default SearchBar;
