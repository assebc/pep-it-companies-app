import { FC, useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Layout, Space, Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ICompany } from "../../config";
import api from "../../services/api";
import "./styles.css";

export const CompaniesList: FC = () => {
  const [companies, setCompanies] = useState<ICompany[]>();
  const navigate = useNavigate();
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
      width: localStorage.getItem("token") ? "630px" : "810px",
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
            <Button className="invbutton" onClick={() => handleVote(record)}>Votar</Button>
            <Button className="invbutton" onClick={() => navigate(`/companies/${record.id}`)}>Editar</Button>
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

  return (
    <Layout.Content className="content">
      <div className="align">
        <div className="components">
          {isAdmin && (
            <Button
              className="button"
              type="primary"
              size="large"
              onClick={() => navigate("/companies/new")}
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
          ></Table>

        </div>
      </div>
    </Layout.Content>
  );
};
