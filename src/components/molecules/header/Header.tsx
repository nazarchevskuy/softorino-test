import React, { FC } from "react";
import Button from "../../atoms/button/Button";
import ButtonVariant from "../../atoms/button/buttonVariant";
import useLogin from "../../../models/login/useLogin";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { handleLogout } = useLogin();
  const userName = localStorage.getItem("userName");
  return (
    <div className="flex items-center justify-between mb-6 bg-slate-400 rounded p-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className={"flex items-center"}>
        <span className={"me-2 text-cyan-300"}>{userName}</span>
        <Button
          title={"Log out"}
          variant={ButtonVariant.info}
          onClick={() => handleLogout()}
        />
      </div>
    </div>
  );
};

export default Header;
