import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Space, Button, Form, Input, Row, Col, Typography } from "antd";
import api from "../../services/api";
import "./styles.css";

export const Login: FC = () => {
  const [form] = Form.useForm();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState<any>(); //FIXME: dont know type name
  const navigate = useNavigate();
  const isAdmin: boolean = localStorage.getItem("token") ? true : false;

  const handleSubmit = async (data: any) => {
    //FIXME: data its not any type
    // setUsername(data.username)
    // setPassword(data.password);

    // try{
    //   const response = await api.get(`users/${username}`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   });

    //   if (response.status == 200 && password == response.data.password){
    //     setUser(response.data);
    //     alert("Login efetuado com sucesso!");
    //     navigate("/companies");
    //   }

    // } catch (err: any){
    //   alert(err.response.data.error);
    // }
    navigate("/companies");
  };

  return (
    <div className="container">
      <Typography.Title level={2}>Login</Typography.Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className={"form"}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Link to={"/changepassword"}>Esqueceu-se da password?</Link>
        </Form.Item>

        <Row justify="space-between" gutter={12}>
          <Col span={12}>
            <Button
              style={{ width: "100%" }}
              type="default"
              className="invbutton"
              onClick={() => navigate("/companies")}
            >
              Visitar
            </Button>
          </Col>

          <Col span={12}>
            <Button
              type="primary"
              className="button"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
