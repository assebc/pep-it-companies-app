import { FC, ReactNode, CSSProperties } from "react";
import { Button as AntButton } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import "./styles.css";

interface IButtonProps {
  children: ReactNode;
  styles?: CSSProperties;
  size?: SizeType;
  htmlType?: "submit" | "button";
  onClick?: () => void;
}

export const Button: FC<IButtonProps> = ({
  children,
  styles,
  size,
  onClick,
  htmlType = "button",
}) => {
  return (
    <AntButton
      htmlType={htmlType}
      size={size}
      style={styles}
      onClick={() => (onClick ? onClick() : undefined)}
      className={htmlType === "submit" ? "submit_button" : "actions_button"}
    >
      {children}
    </AntButton>
  );
};
