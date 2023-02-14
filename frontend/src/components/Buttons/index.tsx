import { FC } from "react";
import { Button } from "antd";
import "./styles.css";

export const ActionsButton: FC = () => {
  return (
    <Button
      className="actions_button"
      onClick={() => undefined}
    >
      {undefined}
    </Button>
  );
};

export const CancelButton: FC = () => {
  return (
    <Button
      type="default"
      className="actions_button"
      onClick={() => undefined}
    >
      Cancelar
    </Button>
  );
};


export const VisitButton: FC = () => {
  return (
    <Button
      className="actions_button"
      type="default"
      onClick={() => undefined}
      style={{
        width: "100%"
      }}
    >
      Visitar
    </Button>
  );
};

export const LoginButton: FC = () => {
  return (
    <Button
      type="primary"
      className="submit_button"
      htmlType="submit"
      style={{
        width: "100%"
      }}
    >
      Login
    </Button>
  );
};

export const ChangeButton: FC = () => {
  return (
    <Button
      type="primary"
      className="submit_button"
      htmlType="submit"
      style={{
        width: "100%",
        marginTop: "-24px"
      }}
    >
      Alterar
    </Button>
  );
};

export const OkButton: FC = () => {
  return (
    <Button
      type="primary"
      className="submit_button"
      htmlType="submit"
    >
      Ok
    </Button>
  );
};

export const CreateButton: FC = () => {
  return (
    <Button
      className="submit_button"
      type="primary"
      size="large"
      style={{
        marginBottom: "8px",
        width: "100px"
      }}
      onClick={() => undefined}
    >
      Criar
    </Button>
  )
}