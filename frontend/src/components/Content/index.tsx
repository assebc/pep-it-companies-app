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
  const [isEditingCompany, setIsEditingCompany] = useState<boolean>(false);
  const isAdmin: boolean = localStorage.getItem("token") ? true : false;

  const DEFAULT_COLUMNS: ColumnsType<ICompany> = [
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
  ];

  const ADMIN_COLUMNS: ColumnsType<ICompany> = [
    ...DEFAULT_COLUMNS,
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

  const getCompanies = () => {
    api.get("companies").then((response) => {
      setCompanies(response.data);
    });
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const showModal = (record?: ICompany) => {
    if (record) {
      setCompany(record);
      setIsEditingCompany(true);
    }
    setOpen(true);
  };

  const onHandleClose = useCallback(() => {
    setOpen(false);
    getCompanies();
  }, []);

  const onAfterClose = useCallback(() => {
    setCompany(undefined);
    setIsEditingCompany(false);
  }, []);

  return (
    <Layout.Content className="content">
      <div className="align">
        <div className="components">
          {isAdmin && (
            <Button
              className="button"
              type="primary"
              size="large"
              onClick={() => showModal()}
            >
              Criar
            </Button>
          )}

          <Table
            columns={
              localStorage.getItem("token") ? ADMIN_COLUMNS : DEFAULT_COLUMNS
            }
            pagination={false}
            bordered={true}
            tableLayout={"fixed"}
            dataSource={companies}
            rowKey="id"
          />

          <CreateEditModal
            company={company}
            isEditing={isEditingCompany}
            open={open}
            confirmLoading={confirmLoading}
            onHandleClose={onHandleClose}
            onAfterClose={onAfterClose}
          />
        </div>
      </div>
    </Layout.Content>
  );
};
