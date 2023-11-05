import React, { FC } from "react";
import ButtonVariant from "./buttonVariant";
import Loader from "../loader/Loader";

interface ButtonProps {
  title: string;
  variant: ButtonVariant;
  onClick: () => void;
  width?: string;
  isLoading?: boolean;
  ms?: string;
  me?: string;
}

const Button: FC<ButtonProps> = ({
  title,
  variant,
  onClick,
  width,
  isLoading,
  ms,
  me,
}) => {
  let btnVariant = "";
  switch (variant) {
    case ButtonVariant.success:
      btnVariant += " bg-blue-700 hover:bg-blue-900";
      break;
    case ButtonVariant.info:
      btnVariant += " bg-blue-400 hover:bg-blue-500";
      break;
    default:
      btnVariant += "bg-violet-700  hover:bg-violet-900";
  }

  return (
    <button
      className={`rounded flex justify-center items-center cursor-pointer text-white py-2 px-4 ${btnVariant} ${
        width ? width : ""
      } ${ms ? ms : ""} ${me ? me : ""}`}
      disabled={isLoading}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {isLoading && (
        <div className={"me-5"}>
          <Loader isSmall />
        </div>
      )}
      {title}
    </button>
  );
};

export default Button;
