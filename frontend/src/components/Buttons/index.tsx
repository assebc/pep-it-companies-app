import { FC } from "react";
import { Button } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import "./styles.css";

interface Props {
  text: string;
  style?: React.CSSProperties | undefined;
  type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined;
  size?: SizeType;
  onClick: () => void;
}

export const ActionsButton: FC<Props> = (props: Props) => {
  return (
    <Button
      className="actions_button"
      type={props.type}
      size={props.size}
      style={props.style}
      onClick={() => props.onClick()}
    >
      {props.text}
    </Button>
  );
};

export const SubmitButton: FC<Props> = ({type,size,style,text}: Props) => {
  return (
    <Button
      type={type}
      size={size}
      style={style}
      className="submit_button"
      htmlType="submit"
    >
      {text}
    </Button>
  );
};
