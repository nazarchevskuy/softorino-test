import React, { FC, PropsWithChildren, useState } from "react";
import { Navigate } from "react-router-dom";
import AppPaths from "../configs/appPaths";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const [user] = useState<boolean | null>(!!localStorage.getItem("loginToken"));

  if (!user) return <Navigate to={AppPaths.LoginPage} replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
