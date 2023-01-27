
import { Layout } from "antd";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import axios from "axios";
import "./index.css";

function App() {

  const state = { newData: null };
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

  const handleFile = (e:any)  => {
    let newFiles = e.target.newfiles;
    useState({ newFiles });
  }

  const handleUpload = (e:any) => {
    let newData = state.newData;
    let formData = undefined; // FIXME: this is done

    axios({
      url: "",
      method: "PUT", // or POST idk :/ 
      headers: {
        authorization: undefined, // FIXME: insert token
      },
      data: formData,
    }).then((res) => { }).catch((err) => { });
    
    // TODO: insert in action of button 
  }

  return (
    <Layout className="layout">
      <Header/>
      <Content/>
      <Footer/>
    </Layout>
  );
}

export default App;
