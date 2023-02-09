import { Layout } from "antd";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateCompany } from "./components/CreateCompany";
import { UpdateCompany } from "./components/UpdateCompany";
import "./index.css";

function App() {
  return (
    <>
    <Layout className="layout">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              <Content />
          } />
          <Route path="companies/new" element={<CreateCompany />}/>
          <Route path="companies/:id" element={<UpdateCompany />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </Layout>
    </>
  );
}

export default App;
