import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Space, Button, Form, Input, Row, Col, Typography } from "antd";
import api from "../../services/api";
import "./styles.css";

export const Login: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    
    try{
      const response = await api.post(`users/${data.email}`, data, {

      });

      if (response.status == 200){
        navigate("/companies");
      }

    } catch (err: any){
      alert(err.response.data.error);
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
          name="password"
          rules={[{ required: true }]}
          style={{
            marginBottom: "0px"
          }}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        
        <Link to={"/forgot-password"}>Esqueceu-se da password?</Link>

        <Row justify="space-between" gutter={12} style={{
            marginTop: "24px"
          }}>
          <Col span={12}>
            <Button
              style={{ 
                width: "100%" ,
                fontWeight: "bold"
              }}
              type="default"
              className="invbutton"
              onClick={() => navigate("/companies")}
            >
              Visitar
            </Button>
          </Col>

          <Col span={12}>
            <Button
              style={{ 
                width: "100%",
                fontWeight: "bold"
              }}
              type="primary"
              className="button"
              htmlType="submit"
            >
              Login
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
