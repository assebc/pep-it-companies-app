import { FC } from "react";
import { Layout, Space } from "antd";
import logo from "../../assets/pep-logo.png";

export const Header: FC = () => {
  return (
    <Layout.Header 
      style={{ 
        height: "10%", 
        display: "flex",
        justifyContent: "space-between",
        alignItems:"center", 
        backgroundColor: "Background",
        paddingInline: 0,
        lineHeight: 0
        }}>
        <a href="https://www.twitch.tv/porqueeuprogramo" target="_blank">
          <img
            style={{ width: "100px", height: "100px" }}
            src={logo}
            alt="PEP LOGO"
          />
        </a>
      <p style={{fontWeight:"bold", color:"#BD242A", fontSize:"20px"}}>PorqueEuProgramo • IT Companies</p>
    </Layout.Header>
  );
};
