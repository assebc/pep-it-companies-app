import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, message, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ACCESS_TOKEN_KEY, ICompany } from "../../config";
import { Button } from "../../components/Button";
import api from "../../services/api";
import "./styles.css";

export const CompaniesList: FC = () => {
  const [companies, setCompanies] = useState<ICompany[]>();
  const navigate = useNavigate();
  const isAdmin: boolean = localStorage.getItem(ACCESS_TOKEN_KEY)
    ? true
    : false;

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
      width: localStorage.getItem(ACCESS_TOKEN_KEY) ? "630px" : "810px",
    },
    {
      title: "Website",
      dataIndex: "website_url",
      key: "website_url",
      width: "220px",
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
      width: "212px",
      render: (_, record) => {
        return (
          <>
            <Button
              onClick={() => handleVote(record)}
              children="Votar"
              styles={{
                width: "100%",
                marginBottom: "8px",
              }}
            />
            <Space size="middle">
              <Button
                onClick={() => navigate(`/companies/${record.id}`)}
                children="Editar"
              />
              <Button onClick={() => handleRemove(record)} children="Remover" />
            </Space>
          </>
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

  const handleVote = async (record: ICompany) => {
    try {
      const response = await api.patch(`companies/${record.id}/vote`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
        },
      });
      if (response.status === 200) {
        getCompanies();
      }
    } catch (err: any) {
      message.error(err.response.data.error);
    }
  };

  const handleRemove = async (record: ICompany) => {
    try {
      const response = await api.delete(`companies/${record.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
        },
      });
      if (response.status === 200) {
        message.success("Empresa apagada com sucesso");
        getCompanies();
      }
    } catch (err: any) {
      message.error(err.response.data.error);
    }
  };

  return (
    <Layout.Content className="content">
      <div className="align">
        <div className="components">
          {isAdmin && (
            <Button
              onClick={() => navigate("/companies/new")}
              children="Criar"
              size="large"
              htmlType="submit"
              styles={{
                width: "100px",
                marginBottom: "8px",
              }}
            />
          )}

          <Table
            columns={
              localStorage.getItem(ACCESS_TOKEN_KEY)
                ? ADMIN_COLUMNS
                : DEFAULT_COLUMNS
            }
            pagination={false}
            bordered={true}
            tableLayout={"fixed"}
            dataSource={companies}
            rowKey="id"
          ></Table>
        </div>
      </div>
    </Layout.Content>
  );
};
