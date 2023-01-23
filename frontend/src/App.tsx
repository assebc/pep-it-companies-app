import React, { useState } from "react";
import "./index.css";
import {Space, Table, Layout} from "antd"; 
import type { ColumnsType } from "antd/es/table";
import logo from "./assets/pep-logo.png";

interface Empresas{
  key: string;
  nome: string;
  website: string;
  informacoes: string;
  votos: number;
}

const columns: ColumnsType<Empresas> = [
  {
    title: "Nome",
    dataIndex: "nome",
    key: "nome",
  },
  {
    title: "Informações",
    dataIndex: "informacoes",
    key: "informacoes",
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
    render: text => <a>{text}</a>,
  },
  {
    title: "Votos",
    dataIndex: "votos",
    key: "votos",
  },
  {
    title: "Ações",
    key: "action",
    render: (_,record) => (
      <Space size="middle">
          <a>Votar</a>
          <a>Editar</a>
      </Space>
    ),
  },
];

const data: Empresas[] = [
   {
     key: "1",
     nome: "MEU CU",
     informacoes: "akshjdgalsdadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
     website:"www.google.pt",
     votos: 999,
   },
   {
    key: "2",
    nome: "TEU CU",
    informacoes: "akshjdgalsdadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    website:"porhub.com",
    votos: 1,
  },
  {
    key: "3",
    nome: "NOSSO CU",
    informacoes: "akshjdgalsdadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    website:"assebc.pt",
    votos: 12,
  },
]

const{Header,Content,Footer} = Layout;

function App() {
  return (
    <Layout>
      <Header style={{display:"flex", alignItems:"center", justifyContent:"left", height:"10vh"}}>
        <img style={{width:"100px", height:"100px"}}src={logo} alt="PEP LOGO"/>
      </Header>

      <Content>
        <div style={{height:"80vh", display:"flex", justifyContent:"center", alignItems:"center", padding:"24px"}}>
          {/* FIXME: default size for table */}
          <Table style={{height:"30vh"}}columns={columns} pagination={false} dataSource={data} />
        </div>
      </Content>
      <Footer style={{height:"5vh",textAlign:"center"}}>porque eu programo {new Date().getFullYear()} Created by <a href="https://github.com/assebc" target="_blank">@assebc</a>  and  <a href="https://github.com/galleonpt" target="_blank">@galleonpt</a>.</Footer>
    </Layout>
  );
};

export default App;
