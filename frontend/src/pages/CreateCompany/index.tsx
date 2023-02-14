import { FC, useEffect } from "react";
import { Form, Input, Button, Space, Row, Col, message } from "antd";
import { ACCESS_TOKEN_KEY, ICreateUpdateCompanyData } from "../../config";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import api from "../../services/api";
import "./styles.css";

export const CreateCompany: FC = ({ }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.resetFields();
  });

  const createCompany = async (data: ICreateUpdateCompanyData) => {
    try {
      const response = await api.post("companies", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
        },
      });

      if (response.status === 201) {
        message.success("Empresa criada com sucesso", 3);
      }
    } catch (err: any) {
      message.error(err.response.data.error, 3);
    }
  };

  const handleSubmit = async (data: ICreateUpdateCompanyData) => {
    await createCompany(data);
    navigate("/companies");
  };

  return (
    <div className="form_wrapper">
      <h1>{"Adicionar empresa"}</h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className={"inputs_wrapper"}
        autoComplete="off"
      >
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              label="Nome"
              name="name"
              initialValue={""}
              rules={[{ required: true }]}
            >
              <Input placeholder="Nome da empresa" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Website URL"
              name="website_url"
              initialValue={""}
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g. https://empresa.com" type="text" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Informações"
          name="reviews"
          initialValue={""}
          rules={[{ required: true }]}
        >
          <TextArea placeholder="Informações sobre a empresa" autoSize={true} />
        </Form.Item>

        <Space className="action_btns_container">
          <Button
            type="default"
            className="cancel_button"
            onClick={() => navigate("/companies")}
          >
            Cancelar
          </Button>
          <Button type="primary" className="submit_button" htmlType="submit">
            Ok
          </Button>
        </Space>
      </Form>
    </div>
  );
};
