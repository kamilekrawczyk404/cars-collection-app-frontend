import React from "react";

type CustomSelectorProps = {
  label: string;
  options: string[];
  errorMessage?: string;
  onSelect: (value: string) => void;
  currentActive?: string;
};

const CustomSelector = ({
  label,
  options,
  errorMessage,
  onSelect,
  currentActive,
}: CustomSelectorProps) => {
  return (
    <div className={""}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <ul className={"flex flex-wrap gap-2"}>
        {options.map((option) => (
          <li
            key={option}
            onClick={() => onSelect(currentActive === option ? "" : option)}
            className={`rounded-md border-[1px] h-8 px-2 place-content-center cursor-pointer text-md transition-colors ${
              currentActive === option
                ? "border-accent bg-accent/10"
                : "bg-white"
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
      {!!errorMessage && (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomSelector;
