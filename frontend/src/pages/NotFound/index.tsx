import { Layout, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { ACCESS_TOKEN_KEY } from "../../config";
import "./styles.css";

export const NotFound: FC = () => {
  const navigate = useNavigate();

  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

  const [animateParagraph, setAnimateParagraph] = useState<boolean>(false);
  const [animateButton, setAnimateButton] = useState<boolean>(false);

  useEffect(() => {
    setIsUserLogged(localStorage[ACCESS_TOKEN_KEY] ? true : false);

    setTimeout(() => {
      setAnimateParagraph(true);

      setTimeout(() => {
        setAnimateButton(true);
      }, 800);
    }, 800);
  }, []);

  const handleRedirect = () => navigate(isUserLogged ? "/companies" : "/");

  return (
    <Layout.Content className="content">
      <div className="container">
        <Typography.Title className="title element-animation">
          Ups, parece que andas perdido.
        </Typography.Title>
        <Typography.Paragraph
          className={
            animateParagraph ? "element-animation paragraph" : "paragraph"
          }
        >
          Mas não te preocupes, nós ajudamos-te a voltar ao caminho certo.
        </Typography.Paragraph>

        {animateButton && (
          <div className="element-animation">
            <Button
              htmlType="button"
              styles={{ width: "100px", height: "40px" }}
              onClick={handleRedirect}
              children="Voltar"
            />
          </div>
        )}
      </div>
    </Layout.Content>
  );
};
