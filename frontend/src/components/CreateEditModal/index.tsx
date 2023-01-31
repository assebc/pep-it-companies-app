import { FC } from "react";
import { Modal, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { ICompany } from "../../config";

interface ICreateEditModal {
  company?: ICompany;
  open: boolean;
  confirmLoading: boolean;
  onHandleOk: () => void;
  onHandleCancel: () => void;
  onAfterClose?: () => void;
}

export const CreateEditModal: FC<ICreateEditModal> = ({
  company,
  open,
  onHandleOk,
  confirmLoading,
  onHandleCancel,
  onAfterClose,
}) => {
  return (
    <Modal
      destroyOnClose
      title={company?.id ? "Editar empresa" : "Adicionar empresa"}
      open={open}
      onOk={onHandleOk}
      confirmLoading={confirmLoading}
      onCancel={onHandleCancel}
      afterClose={onAfterClose}
    >
      <Form layout="vertical">
        <FormItem label={"Nome"}>
          <Input
            placeholder="Nome de empresa"
            defaultValue={company?.name ?? ""}
          />
        </FormItem>

        <FormItem label={"Informações"}>
          <TextArea
            placeholder="Informações sobre empresa"
            autoSize={{ minRows: 3, maxRows: 5 }}
            defaultValue={company?.reviews ?? ""}
          />
        </FormItem>

        <FormItem label={"URL"}>
          <Input
            placeholder="e.g. https://empresa.com"
            type="text"
            defaultValue={company?.website_url ?? ""}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};
