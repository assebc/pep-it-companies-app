import { FC, useEffect, useState } from "react";
import { Form, Input, Button, Space, InputNumber, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ICompany, ICreateUpdateCompanyData } from "../../config";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./styles.css";

interface IUpdateCompanyProps {
  company?: ICompany;
}

export const UpdateCompany: FC<IUpdateCompanyProps> = ({

}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<ICompany[]>();
  const [company, setCompany] = useState<ICompany | undefined>();
  const isAdmin: boolean = localStorage.getItem("token") ? true : false;

  const getCompanies = () => {
    api.get("companies").then((response) => {
      setCompanies(response.data);  
    });
  };

  useEffect(() => {
    getCompanies();
    form.setFieldsValue({ ...company });
  });

  const updateCompany = async (data: ICreateUpdateCompanyData) => {
    try {
      const response = await api.put(`companies/${company?.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        alert("Empresa atualizada com sucesso com sucesso");
      }
    } catch (err: any) {
      alert(err.response.data.error);
    }
  };

  const handleSubmit = async (data: ICreateUpdateCompanyData) => {
    await updateCompany(data);
    navigate("/");
  };

  const onFormValuesChange = () => {};

  return (

    <div className="updatecompaniesform">
      <h1>{"Editar empresa"}</h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        onValuesChange={onFormValuesChange}
      >
        <Row gutter={10}>
          <Col span={10}>
            <Form.Item
              label="Nome"
              name="name"
              initialValue={""}
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input placeholder="Nome da empresa" autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Website URL"
              name="website_url"
              initialValue={""}
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input placeholder="e.g. https://empresa.com" type="text" autoComplete="off"/>
            </Form.Item>
          </Col>
          <Col span={4}>
            {(
                <Form.Item
                  label="Votos"
                  name="votes"
                  initialValue={0}
                  rules={[
                    { type: "number" },
                    { required: true, message: "Campo obrigatório" },
                  ]}
                >
                  <InputNumber min={0} autoComplete="off"/>
                </Form.Item>
              )}
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
