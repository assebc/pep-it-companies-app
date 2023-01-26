import { useCallback, useEffect, useState } from "react";
import "./index.css";
import { Space, Table, Layout, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { companiesData, Empresa } from "./config";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CreateEditModal } from "./components/CreateEditModal";

const { Content } = Layout;

function App() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [companies, setCompanies] = useState<Empresa[]>();
  const [company, setCompany] = useState<Empresa>();

  const EMPTY_COMPANY: Empresa = {
    key: "",
    name: "",
    reviews: "",
    votes: 0,
    website_url: "",
  };

  const columns: ColumnsType<Empresa> = [
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
      render: (text) => (
        <a href={text} target="_blank">
          {text}
        </a>
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
    setCompanies(companiesData);
  }, []);

  const showModal = (record?: Empresa) => {
    if (record) setCompany(record);
    setOpen(true);
  };

  const onHandleOk = useCallback(() => {
    console.log("on ok");
    setConfirmLoading(false);
    setOpen(false);
  }, []);

  const onHandleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const onAfterClose = useCallback(() => {
    setCompany(EMPTY_COMPANY);
  }, []);

  return (
    <Layout style={{width: "1280px", minHeight:"100vh"}}>
      <Header/>

      <Content style={{ height: "84%" , backgroundColor: "Background"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "64px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
              flexDirection: "column",
            }}
          >
            <Button
              type="primary"
              size="large"
              onClick={() => showModal()}
              style={{ 
                marginBottom: "8px",
                width: "100px",
                backgroundColor: "#BD242A",
                fontWeight: "bold"
              }}
            >
              Criar
            </Button>

            <Table
              columns={columns}
              pagination={false} 
              bordered={true}
              tableLayout={"fixed"}
              dataSource={companies}
            />

            <CreateEditModal
              company={company}
              open={open}
              confirmLoading={confirmLoading}
              onHandleOk={onHandleOk}
              onHandleCancel={onHandleCancel}
              onAfterClose={onAfterClose}
            />
          </div>
        </div>
      </Content>

      <Footer />
    </Layout>
  );
}

export default App;
