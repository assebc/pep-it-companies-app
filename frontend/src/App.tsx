import { Layout} from "antd";

import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import "./index.css";

function App() {
  return (
    <Layout className="layout">
      <Header/>
      <Content/>
      <Footer/>
    </Layout>
  );
}

export default App;
