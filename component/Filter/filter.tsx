import { useState } from "react";
import { NativeSelect } from "@mantine/core";
import { FilteredButtonProps } from "@/utils/pokemonDataType";

const FilteredButton: React.FC<FilteredButtonProps> = ({ onTypeSelect }) => {
  const [value, setValue] = useState<string>("");

  const handleTypeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.currentTarget.value;
    setValue(selectedType);
    onTypeSelect(selectedType);
  };

  return (
    <NativeSelect
      label="Filter by Type"
      value={value}
      onChange={handleTypeSelect}
      data={[
        "All",
        "Normal",
        "Fire",
        "Water",
        "Grass",
        "Electric",
        "Psychic",
        "Rock",
        "Poison",
      ]}
    />
  );
};

export default FilteredButton;
