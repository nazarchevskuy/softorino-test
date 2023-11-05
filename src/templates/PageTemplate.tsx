import React, { FC, PropsWithChildren } from "react";

const PageTemplate: FC<PropsWithChildren> = ({ children }) => {
  return <div className="container mx-auto p-4">{children}</div>;
};

export default PageTemplate;
