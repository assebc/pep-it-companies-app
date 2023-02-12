import { FC } from "react";
import { Button, Layout } from "antd";
import logo from "../../assets/pep-logo.png";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import "./index.css";

export const Header: FC = () => {
  return (
    localStorage.getItem("token") ?

    <Layout.Header className="header_admin">
      <Link to="https://www.twitch.tv/porqueeuprogramo" target="_blank">
        <img width={"100px"} height={"100px"} src={logo} alt="PEP LOGO"/>
      </Link>
      <p>PorqueEuProgramo • IT Companies</p>
      <div>
        <Button className="logout" type="link">
          Logout 
          <LogoutOutlined />
        </Button>
        
      </div>

    </Layout.Header>   
      
    :

    <Layout.Header className="header">
      <Link to="https://www.twitch.tv/porqueeuprogramo" target="_blank">
        <img width={"100px"} height={"100px"} src={logo} alt="PEP LOGO"/>
      </Link>
      <p>PorqueEuProgramo • IT Companies</p>
    </Layout.Header> 

  );
};
