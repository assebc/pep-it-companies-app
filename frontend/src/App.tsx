import { FC } from "react";
import { ConfigProvider, Layout as AntLayout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PrivateRoute } from "./components/PrivateRoute";
import { CompaniesList } from "./pages/CompaniesList";
import { CreateCompany } from "./pages/CreateCompany";
import { UpdateCompany } from "./pages/UpdateCompany";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Login } from "./pages/Login";
import { ACCESS_TOKEN_KEY } from "./config";
import "./styles.css";

const Layout: FC = () => {

  const isAuthenticated = localStorage.getItem(ACCESS_TOKEN_KEY) ? true: false;

  return (
    <AntLayout className="layout">
      <Header />
      <Routes>
        <Route path="/companies" element={<CompaniesList />} />
        {/* //FIXME: */}
        <PrivateRoute path="/companies/new" element={CreateCompany} isAuth={isAuthenticated} redirectTo="/" />
        <PrivateRoute path="/companies/:id" element={UpdateCompany} isAuth={isAuthenticated} redirectTo="/" />
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
