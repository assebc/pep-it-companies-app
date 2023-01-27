import { FC } from "react";
import { Layout } from "antd";
import logo from "../../assets/pep-logo.png";
import "./index.css";

export const Header: FC = () => {
  return (
    <Layout.Header className="header">
      <a href="https://www.twitch.tv/porqueeuprogramo" target="_blank">
        <img src={logo} alt="PEP LOGO"/>
      </a>
      <p>PorqueEuProgramo • IT Companies</p>
    </Layout.Header>
  );
};
