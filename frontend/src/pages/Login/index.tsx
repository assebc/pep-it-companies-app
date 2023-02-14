import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Row, Col, Typography, message } from "antd";
import { ACCESS_TOKEN_KEY } from "../../config";
import { LoginButton, VisitButton } from "../../components/Buttons";
import api from "../../services/api";
import "./styles.css";

interface ILoginPayload {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }: ILoginPayload) => {
    try {
      const response = await api.post("login", {
        email,
        password,
      });

      if (response.status == 200) {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data);
        navigate("/companies");
      }
    } catch (err: any) {
      message.error(err.response.data.error, 3);
    }
  };

  return (
    <div className="container">
      <Typography.Title level={2}>Login</Typography.Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        autoComplete="off"
        style={{
          width: "400px",
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email" }, { required: true }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
          style={{
            marginBottom: "0px",
          }}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Link to={"/forgot-password"}>
          Esqueceu-se da password?
        </Link>

        <Row
          justify="space-between"
          gutter={12}
          style={{
            marginTop: "24px",
          }}
        >
          <Col span={12}>
            {/* FIXME: navigate("/companies") */}
            <VisitButton />
          </Col>

          <Col span={12}>
            {/* FIXME: handleSubmit */}
            <LoginButton />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
