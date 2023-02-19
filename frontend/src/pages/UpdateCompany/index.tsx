import { FC, useEffect, useState } from "react";
import {
  Form,
  Input,
  Space,
  InputNumber,
  Row,
  Col,
  message,
} from "antd";
import {
  ACCESS_TOKEN_KEY,
  ICompany,
  ICreateUpdateCompanyData
} from "../../config";
import { useParams, useNavigate } from "react-router-dom";
import { ActionsButton, SubmitButton } from "../../components/Buttons";
import TextArea from "antd/es/input/TextArea";
import api from "../../services/api";
import "./styles.css";

interface IUpdateCompanyProps {
  company?: ICompany;
}

export const UpdateCompany: FC<IUpdateCompanyProps> = ({ }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [company, setCompany] = useState<ICompany | undefined>();

  const getCompany = async () => {
    try {
      const response = await api.get(`companies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
        },
      });

      if (response.status === 200) {
        setCompany(response.data);
      }
    } catch (err: any) {
      message.error("Email não existe ou Passwords não coincidem");
      form.resetFields();
    }
  };

  useEffect(() => {
    if (!company) getCompany();
    form.setFieldsValue({ ...company });
  }, [company]);

  const updateCompany = async (data: ICreateUpdateCompanyData) => {
    try {
      const response = await api.put(`companies/${company?.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
        },
      });

      if (response.status === 200) {
        message.success("Empresa atualizada com sucesso", 3);
      }
    } catch (err: any) {
      message.error(err.response.data.error, 3);
    }
  };

  const handleSubmit = async (data: ICreateUpdateCompanyData) => {
    await updateCompany(data);
    navigate("/companies");
  };

  return (
    <div className="form_wrapper">
      <h1>{"Editar empresa"}</h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className={"inputs_wrapper"}
        autoComplete="off"
      >
        <Row gutter={10}>
          <Col span={11}>
            <Form.Item
              label="Nome"
              name="name"
              initialValue={""}
              rules={[{ required: true }]}
            >
              <Input placeholder="Nome da empresa" />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Website URL"
              name="website_url"
              initialValue={""}
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g. https://empresa.com" type="text" />
            </Form.Item>
          </Col>
          <Col span={2}>
            {
              <Form.Item
                label="Votos"
                name="votes"
                initialValue={0}
                rules={[{ type: "number" }, { required: true }]}
              >
                <InputNumber className="input_votes" min={0} />
              </Form.Item>
            }
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
        <ActionsButton 
            onClick={() => navigate("/companies")} 
            type="default" 
            text="Cancelar"/>
          <SubmitButton 
            onClick={() => undefined} 
            type="primary" 
            text="Ok"/>
        </Space>
      </Form>
    </div>
  );
};
