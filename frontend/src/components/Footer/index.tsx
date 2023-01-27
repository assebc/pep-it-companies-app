import { FC } from "react";
import { Layout } from "antd";
import "./index.css";

export const Footer: FC = () => {
  return (
    <Layout.Footer className="footer">
      PorqueEuProgramo {new Date().getFullYear()} Created by{" "}
      <a href="https://github.com/assebc" target="_blank">
        @assebc
      </a>{" "}
      and{" "}
      <a href="https://github.com/galleonpt" target="_blank">
        @galleonpt
      </a>
      .
    </Layout.Footer>
  );
};
