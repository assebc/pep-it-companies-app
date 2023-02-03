import { FC, useEffect } from "react";
import { Modal, Form, Input, Button, Space, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ICompany, ICreateUpdateCompanyData } from "../../config";
import "./styles.css";
import api from "../../services/api";
import { AxiosError } from "axios";

interface ICreateEditModalProps {
  company?: ICompany;
  isEditing: boolean;
  open: boolean;
  confirmLoading: boolean;
  onHandleClose: () => void;
  onAfterClose?: () => void;
}

export const CreateEditModal: FC<ICreateEditModalProps> = ({
  company,
  isEditing,
  open,
  confirmLoading,
  onHandleClose,
  onAfterClose,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditing) {
      form.setFieldsValue({ ...company });
    } else {
      form.resetFields();
    }
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
        onHandleClose();
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
    isEditing ? updateCompany(data) : createCompany(data);
  };

  const onFormValuesChange = () => {};

  return (
    <Modal
      forceRender
      destroyOnClose
      title={isEditing ? "Editar empresa" : "Adicionar empresa"}
      open={open}
      confirmLoading={confirmLoading}
      onCancel={onHandleClose}
      afterClose={onAfterClose}
      footer={null}
    >
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

        {isEditing && (
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
    </Modal>
  );
};
