import { FC, useEffect } from "react";
import { Form, Input, Button, Space, Row, Col } from "antd";
import { ICreateUpdateCompanyData } from "../../config";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import api from "../../services/api";
import "./styles.css";

interface ICreateCompanyProps {
}

export const CreateCompany: FC<ICreateCompanyProps> = ({}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.resetFields();
  });

  const createCompany = async (data: ICreateUpdateCompanyData) => {
    try {
      const response = await api.post("companies", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        alert("Empresa criada com sucesso");
      }
    } catch (err: any) {
      alert(err.response.data.error);
    }
  };

  const handleSubmit = async (data: ICreateUpdateCompanyData) => {
    await createCompany(data);
    navigate("/");
  };

  return (
    <div className="newcompaniesform">
      <h1>{"Adicionar empresa"}</h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className={"newcompaniesinputs"}
      >
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              label="Nome"
              name="name"
              initialValue={""}
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input placeholder="Nome da empresa" autoComplete="off"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Website URL"
              name="website_url"
              initialValue={""}
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input placeholder="e.g. https://empresa.com" type="text" autoComplete="off"/>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Informações"
          name="reviews"
          initialValue={""}
          rules={[{ required: true, message: "Campo obrigatório" }]}
        >
          <TextArea placeholder="Informações sobre a empresa" autoSize={true} autoComplete="off"/>
        </Form.Item>

        <Space className="action_btns_container">
          <Button type="default" onClick={() => navigate("/")}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            Ok
          </Button>
        </Space>
      </Form>
    </div>
  );
};
