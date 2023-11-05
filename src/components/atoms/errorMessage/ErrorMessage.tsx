import React, { FC } from "react";

interface ErrorMessageProps {
  title: string;
  isBordered?: boolean;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ title, isBordered }) => {
  return (
    <div
      className={`w-full text-red-500 px-4 rounded-md my-2 ${
        isBordered ? "border border-red-400 py-2" : ""
      }`}
    >
      {title}
    </div>
  );
};

export default ErrorMessage;
