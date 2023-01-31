import { FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Space, Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CreateEditModal } from "../CreateEditModal";
import { ICompany } from "../../config";
import api from "../../services/api";
import "./styles.css";

export const Content: FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>();
  const [company, setCompany] = useState<ICompany | undefined>();

  const columns: ColumnsType<ICompany> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: "150px",
    },
    {
      title: "Informações",
      dataIndex: "reviews",
      key: "reviews",
      width: "630px",
    },
    {
      title: "Website",
      dataIndex: "website_url",
      key: "website_url",
      width: "250px",
      render: (url) => (
        <Link to={url} target="_blank">
          {url}
        </Link>
      ),
    },
    {
      title: "Votos",
      dataIndex: "votes",
      key: "votes",
      width: "70px",
    },
    {
      title: "Ações",
      key: "actions",
      width: "180px",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button>Votar</Button>
            <Button onClick={() => showModal(record)}>Editar</Button>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    api.get("companies").then((response) => {
      setCompanies(response.data);
    });
  }, []);

  const showModal = (record?: ICompany) => {
    if (record) setCompany(record);
    setOpen(true);
  };

  const onHandleOk = useCallback(() => {
    setConfirmLoading(false);
    setOpen(false);
  }, []);

  const onHandleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const onAfterClose = useCallback(() => {
    setCompany(undefined);
  }, []);

  return (
    <Layout.Content className="content">
      <div className="align">
        <div className="components">
          <Button
            className="button"
            type="primary"
            size="large"
            onClick={() => showModal()}
          >
            Criar
          </Button>

          <Table
            columns={columns}
            pagination={false}
            bordered={true}
            tableLayout={"fixed"}
            dataSource={companies}
            rowKey="id"
          />

          <CreateEditModal
            company={company ?? undefined}
            open={open}
            confirmLoading={confirmLoading}
            onHandleOk={onHandleOk}
            onHandleCancel={onHandleCancel}
            onAfterClose={onAfterClose}
          />
        </div>
      </div>
    </Layout.Content>
  );
};
