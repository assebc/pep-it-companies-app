import { FC } from "react";
import { Layout } from "antd";

export const Footer: FC = () => {
  return (
    <Layout.Footer
      style={{
        textAlign: "center",
        height: "5%",
        backgroundColor: "Background",
        lineHeight: 0
      }}
    >
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
