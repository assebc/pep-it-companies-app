import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Space, Button, Form, Input } from "antd";
import api from "../../services/api";
import "./styles.css";

export const ChangePassword: FC = () => {
  const [form] = Form.useForm();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState();
  const [user, setUser] = useState<any>(); //FIXME: dont know type name
  const navigate = useNavigate();
  const isAdmin: boolean = localStorage.getItem("token") ? true : false;

  const handleSubmit = async (data: any) => {
    //FIXME: data its not any type
    setUsername(data.username);
    setPassword(data.password);
    setRePassword(data.repassword);

    // try{
    //   const response = await api.get(`users/${username}`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   });

    //   if (response.status == 200 && password == repassword){
    //     response.data.password = password;
    //     setUser(response.data);

    //     try {
    //       const response2 = await api.put(`users/${username}`, user, {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       });

    //       if (response2.status === 200) {
    //         alert("Password alterada com sucesso!");
    //         navigate("/");
    //       }
    //     } catch (err: any) {
    //       alert(err.response.data.error);
    //     }
    //   }

    // } catch (err: any){
    //   alert("Password não coincidem ou Username não existe!");
    // }
    navigate("/");
  };

  return (
    <div className="login">
      <h1>{"Alterar Password"}</h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className={"logininputs"}
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

        <Form.Item
          label="Confirme Password"
          name="password2"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button type="primary" className="button" htmlType="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
};
