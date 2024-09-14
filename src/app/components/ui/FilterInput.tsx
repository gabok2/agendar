import React from "react";
import { Icons } from "./icons";

interface FilterInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const FilterInput = ({ placeholder, value, onChange }: FilterInputProps) => {
  return (
    <div className="flex items-center border w-full border-grayPrimary rounded-lg p-3">
      <Icons
        type="MagnifyingGlass"
        size={14}
        weight="regular"
        className="text-gray-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-1 flex-1 text-xs text-gray-400 bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default FilterInput;
