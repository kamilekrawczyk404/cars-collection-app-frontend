import React, { ComponentProps } from "react";
import { SearchIcon } from "lucide-react";

const Search = ({ value, onChange, className }: ComponentProps<"input">) => {
  return (
    <div
      className={`relative border-[1px] rounded-md border-gray-300 flex items-center px-2 w-fit gap-2 shadow-sm h-10 ${className}`}
    >
      <SearchIcon className={"text-gray-500"} size={"1.25rem"} />
      <input
        value={value}
        onChange={onChange}
        type={"text"}
        className={
          "placeholder-gray-500 focus:placeholder-gray-700 focus:outline-none min-w-[200px] transition-colors"
        }
        placeholder={"Search"}
      />
    </div>
  );
};

export default Search;
