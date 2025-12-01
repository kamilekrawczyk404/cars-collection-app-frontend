import React, { ComponentProps, Ref } from "react";

type CustomInputProps = ComponentProps<"input"> & {
  label: string;
  errorMessage?: string;
  ref?: Ref<HTMLInputElement>;
};

const CustomInput = ({
  ref,
  label,
  errorMessage,
  className,
  type = "text",
  ...props
}: CustomInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        ref={ref}
        type={type}
        id={props.name}
        className={`focus:outline-none h-10 px-3 rounded-md border ${
          errorMessage ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {errorMessage && (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomInput;
