import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, message, Typography } from "antd";
import { ChangeButton } from "../../components/Buttons";
import api from "../../services/api";
import "./styles.css";

export const ForgotPassword: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async ({
    email,
    newPassword,
    confirmationPassword,
  }: any) => {
    if (newPassword !== confirmationPassword)
      return message.error("As passwords não são iguais");

    try {
      const response = await api.patch("users/password", {
        email,
        newPassword,
        confirmationPassword,
      });

      if (response.status === 200) {
        message.success("Password alterada com sucesso", 3);
        navigate("/");
      }
    } catch (err: any) {
      message.error(err.response.data.error, 3);
    }
  };

  return (
    <div className="container">
      <Typography.Title level={2}>Alterar Password</Typography.Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        autoComplete="off"
        style={{
          width: "400px"
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
          name="newPassword"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          label="Confirme Password"
          name="confirmationPassword"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        {/* FIXME: handleSubmit */}
        <ChangeButton />
      </Form>
    </div>
  );
};
