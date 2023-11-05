import React, { FC } from "react";

interface EmptyStateProps {
  title: string;
}

const EmptyState: FC<EmptyStateProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold text-gray-600 mb-2">
        No Data Available
      </h2>
      <p className="text-gray-500">There is no {title} to display.</p>
    </div>
  );
};

export default EmptyState;
