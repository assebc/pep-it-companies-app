import { Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CompaniesList } from "./components/CompaniesList";
import { CreateCompany } from "./components/CreateCompany";
import { UpdateCompany } from "./components/UpdateCompany";
import { ChangePassword } from "./components/ChangePassword";
import { Login } from "./components/Login";
import "./index.css";

function App() {
  return (
    <>
    <Layout className="layout">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/"               element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/companies"      element={<CompaniesList />} />
          <Route path="companies/new"   element={<CreateCompany />} />
          <Route path="companies/:id"   element={<UpdateCompany />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Layout>
    </>
  );
}

export default App;
