import { FC, useCallback, useEffect, useState } from "react";
import { Form, Input, Button, Space, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ICompany, ICreateUpdateCompanyData } from "../../config";
import "./styles.css";
import api from "../../services/api";

interface IUpdateCompanyProps {
  company?: ICompany;
}

export const UpdateCompany: FC<IUpdateCompanyProps> = ({

}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>();
  const [company, setCompany] = useState<ICompany | undefined>();
  const [isEditingCompany, setIsEditingCompany] = useState<boolean>(false);
  const isAdmin: boolean = localStorage.getItem("token") ? true : false;

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

  const getCompanies = () => {
    api.get("companies").then((response) => {
      setCompanies(response.data);
    });
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const onHandleClose = useCallback(() => {
    setOpen(false);
    getCompanies();
  }, []);

  const onAfterClose = useCallback(() => {
    setCompany(undefined);
    setIsEditingCompany(false);
  }, []);

  const handleVote = async (record: ICompany) => {
    try {
      const response = await api.patch(`companies/${record.id}/vote`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        getCompanies();
      }
    } catch (err: any) {
      alert(err.response.data.error);
    }
  };

  const updateCompany = async (data: ICreateUpdateCompanyData) => {
    try {
      const response = await api.put(`companies/${company?.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        alert("Empresa atualizada com sucesso com sucesso");
        onHandleClose();
      }
    } catch (err: any) {
      alert(err.response.data.error);
    }
  };

  const handleSubmit = (data: ICreateUpdateCompanyData) => {
    updateCompany(data);
  };

  const onFormValuesChange = () => {};

  return (

      <>
        <h1>{"Editar empresa"}</h1>
        <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        onValuesChange={onFormValuesChange}
        >
          <Form.Item
            label="Nome"
            name="name"
            initialValue={""}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input placeholder="Nome da empresa" />
          </Form.Item>

          <Form.Item
            label="Informações"
            name="reviews"
            initialValue={""}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <TextArea placeholder="Informações sobre a empresa" autoSize={true} />
          </Form.Item>

          <Form.Item
            label="Website URL"
            name="website_url"
            initialValue={""}
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input placeholder="e.g. https://empresa.com" type="text" />
          </Form.Item>

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
              <InputNumber min={0} />
            </Form.Item>
          )}

          <Space className="action_btns_container">
            <Button type="default" onClick={onHandleClose}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit">
              Ok
            </Button>
          </Space>
        </Form>
      </>
  );
};
