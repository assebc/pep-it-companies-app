import { FC } from "react";
import { Layout } from "antd";
import logo from "../../assets/pep-logo.png";

export const Header: FC = () => {
  return (
    <Layout.Header 
      style={{ 
        height: "10vh", 
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "Background"
        }}>
      <a href="https://www.twitch.tv/porqueeuprogramo" target="_blank">
        <img
          style={{ width: "100px", height: "100px" }}
          src={logo}
          alt="PEP LOGO"
        />
      </a>
      <p style={{display:"flex", alignItems:"center", fontWeight:"bold"}}>porque eu programo</p>
    </Layout.Header>
  );
};
