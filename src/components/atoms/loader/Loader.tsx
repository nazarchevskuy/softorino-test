import React, { FC } from "react";

interface LoaderProps {
  isSmall?: boolean;
}

const Loader: FC<LoaderProps> = ({ isSmall }) => {
  return (
    <div
      className={`loader border-t-4 border-green-500 border-solid rounded-full animate-spin ${
        isSmall ? "w-5 h-5" : "w-16 h-16"
      }`}
    />
  );
};

export default Loader;
