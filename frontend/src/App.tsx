import React, { useState } from "react";
import "./index.css";
import {Space, Table, Layout, Button, Modal} from "antd"; 
import type { ColumnsType } from "antd/es/table";
import logo from "./assets/pep-logo.png";

interface Empresas{
  key: string;
  name: string;
  website_url: string;
  reviews: string;
  votes: number;
}

const columns: ColumnsType<Empresas> = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  { //FIXME: define max size per line
    title: "Informações",
    dataIndex: "reviews",
    key: "reviews",
  },
  {
    title: "Website",
    dataIndex: "website_url",
    key: "website_url",
    render: text => <a>{text}</a>,
  },
  {
    title: "Votos",
    dataIndex: "votes",
    key: "votes",
  },
  {
    title: "Ações",
    key: "actions",
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
     name: "Critical Techworks",
     reviews: "Oportunidade de Carreira / Tecnologias de Ponta / Excelente Ambiente de Equipa / Formação Constante / Empresa excelente, muitos benefícios / malta top (Depende do projeto onde calhas) / Os aumentos são bons, Organização boa / os salarios nao sao muito bons, por vezes nao acompanha o crescimento da pessoa / Estrutura muito horizontal, equipas scrum auto geriveis com foco na autonomia. Somos incentivados a ser \"donos do produto\" e nao apenas alguem que faz o que mandam",
     website_url:"https://www.criticaltechworks.com/",
     votes: 11,
   },
   {
    key: "2",
    name: "Blip",
    reviews: "Boa equipa, boas condiçoes, bons salarios, usam tech recente e bons beneficios",
    website_url:"https://www.blip.pt/",
    votes: 3,
  },
  {
    key: "3",
    name: "Deloitte",
    reviews: "Excelente para primeiro trabalho, aposta na formação e é uma empresa que dá a oportunidade de se trabalhar com muitas tecnologias diferentes e tem um ambiente de trabalho top entre colegas e equipas. (falo por experiência própria) / Os salários são normais mas exigem demais dos colaboradores / deloitte nao é ma como entry, 1 ano e estas set para entrar facilmente noutro sitio / facilidade de transitar entre stack",
    website_url:"https://www2.deloitte.com/pt/pt.html",
    votes: 3,
  },
];

const{Header,Content,Footer} = Layout;

function App(){

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("A adicionar empresa à tabela");
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    console.log("Processo cancelado");
    setOpen(false);
  }

  return (
    <Layout>
      <Header style={{display:"flex", alignItems:"center", justifyContent:"left", height:"10vh"}}>
        <img style={{width:"100px", height:"100px"}}src={logo} alt="PEP LOGO"/>
      </Header>

      <Content>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:"24px"}}>

          <div style={{display:"flex", justifyContent:"center", alignItems:"end", flexDirection:"column"}}>
            <Button type="primary" size="large" onClick={showModal}>Criar</Button>
            {/* FIXME: default size for table */}
            <Table style={{height:"30vh"}}columns={columns} pagination={false} dataSource={data}/>

            <Modal title="Adicionar uma empresa à tabela"
                   open={open}
                   onOk={handleOk}
                   confirmLoading={confirmLoading}
                   onCancel={handleCancel}
            >
            {/* // TODO: insert forms and inputs*/}
            {modalText}
          
            </Modal>

          </div>

        </div>
      </Content>
      <Footer style={{height:"5vh",textAlign:"center"}}>porque eu programo {new Date().getFullYear()} Created by <a href="https://github.com/assebc" target="_blank">@assebc</a>  and  <a href="https://github.com/galleonpt" target="_blank">@galleonpt</a>.</Footer>
    </Layout>
  );
};

export default App;
