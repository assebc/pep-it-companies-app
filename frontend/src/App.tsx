import { ConfigProvider, Layout as AntLayout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CompaniesList } from "./pages/CompaniesList";
import { CreateCompany } from "./pages/CreateCompany";
import { UpdateCompany } from "./pages/UpdateCompany";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Login } from "./pages/Login";
import "./index.css";
import { FC } from "react";

const Layout: FC = () => {
  return (
    <AntLayout className="layout">
      <Header />
      <Routes>
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/new" element={<CreateCompany />} />
        <Route path="/companies/:id" element={<UpdateCompany />} />
      </Routes>

      <Footer />
    </AntLayout>
  );
};

function App() {
  return (
    <>
      <ConfigProvider
        form={{
          validateMessages: {
            required: "Campo obrigatório!",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Layout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
