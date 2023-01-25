import { FC } from "react";
import { Layout } from "antd";
import logo from "../../assets/pep-logo.png";

export const Header: FC = () => {
  return (
    <Layout.Header style={{ height: "10vh", top: "0", width: "100%" }}>
      <a href="https://www.twitch.tv/porqueeuprogramo" target="_blank">
        <img
          style={{ width: "100px", height: "100px" }}
          src={logo}
          alt="PEP LOGO"
        />
      </a>
    </Layout.Header>
  );
};
