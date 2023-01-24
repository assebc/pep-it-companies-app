import React, { useState } from "react";
import "./index.css";
import {Space, Table, Layout, Button, Modal, Form, Input} from "antd"; 
import type { ColumnsType } from "antd/es/table";
import logo from "./assets/pep-logo.png";
import TextArea from "antd/es/input/TextArea";
import FormItem from "antd/es/form/FormItem";

interface Empresa{
  key: string;
  name: string;
  website_url: string;
  reviews: string;
  votes: number;
}

const default_state: Empresa = {
  key: "",
  name: "",
  website_url: "",
  reviews: "",
  votes: 0,
};

const data: Empresa[] = [
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

  const columns: ColumnsType<Empresa> = [
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
      render: text => <a href={text} target="_blank">{text}</a>,
    },
    {
      title: "Votos",
      dataIndex: "votes",
      key: "votes",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_,record) => { return (
        <Space size="middle">
            <Button>Votar</Button>
            <Button onClick={() => showModalEdit(record)}>Editar</Button>
        </Space>
      )},
    },
  ];

  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [infoName, setName] = useState("");
  const [infoInfo, setInfo] = useState("");
  const [infoURL, setURL] = useState("");

  const showModal = () => {
    setOpen(true);
    setTitle("Adicionar uma empresa à tabela");
  };

  const showModalEdit = (record: Empresa) => {
    showModal();
    setTitle("Editar empresa já existente");
    setName(record.name);
    setInfo(record.reviews);
    setURL(record.website_url);
  }

  const resetFields = () => {
    setName("");
    setInfo("");
    setURL("");
  }

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Processo cancelado");
    setOpen(false);
  }

  return (
    <Layout>
      <Header style={{height:"10vh", top:"0", width:"100%"}}>
        <a href="https://www.twitch.tv/porqueeuprogramo" target="_blank"><img style={{width:"100px", height:"100px"}} src={logo} alt="PEP LOGO"/></a>
      </Header>

      <Content style={{height:"84vh"}}>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:"64px 48px"}}>

          <div style={{display:"flex", justifyContent:"center", alignItems:"end", flexDirection:"column"}}>
            <Button type="primary" size="large" onClick={showModal} style={{marginBottom:"8px"}}>Criar</Button>
            {/* FIXME: default size for table */}
            <Table style={{height:"30vh"}}columns={columns} pagination={false} dataSource={data}/>

            <Modal destroyOnClose 
                   title={title}
                   open={open}
                   onOk={handleOk}
                   confirmLoading={confirmLoading}
                   onCancel={handleCancel}
                   afterClose={resetFields}
                   >

              <Form layout="vertical">
                <FormItem label={"Nome"}>
                  <Input placeholder="Nome de empresa" defaultValue={infoName}/>
                </FormItem>

                <FormItem label={"Informações"}>
                  <TextArea placeholder="Informações sobre empresa" autoSize={{minRows: 3, maxRows: 5}} defaultValue={infoInfo}/>
                </FormItem>

                <FormItem label={"URL"}>
                  <Input placeholder="e.g. https://empresa.com" type="url" defaultValue={infoURL}/>
                </FormItem>
              </Form>
            </Modal>

          </div>

        </div>
      </Content>
      <Footer style={{textAlign:"center", height:"5vh", bottom:"0", width:"100%"}}>
        porque eu programo {new Date().getFullYear()} Created by <a href="https://github.com/assebc" target="_blank">@assebc</a>  and  <a href="https://github.com/galleonpt" target="_blank">@galleonpt</a>.
      </Footer>
    </Layout>
  );
};

export default App;
