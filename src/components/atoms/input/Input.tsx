import React, { FC } from "react";

interface IInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string;
  mb?: string;
}

const Input: FC<IInputProps> = ({
  name,
  value,
  onChange,
  placeholder,
  width,
  mb,
}) => {
  return (
    <input
      type="text"
      className={`border p-2 mr-2 bg-transparent border-slate-400 full ${
        width ? width : "w-full"
      } ${mb ? mb : ""}`}
      name={name}
      value={value}
      placeholder={placeholder ? placeholder : ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
