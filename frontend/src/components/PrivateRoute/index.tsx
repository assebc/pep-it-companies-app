import { FC } from "react";
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { CreateCompany } from "../../pages/CreateCompany";
import { UpdateCompany } from "../../pages/UpdateCompany";

interface PrivateRouteProps {
  path: string;
  element: typeof CreateCompany | typeof UpdateCompany;
  isAuth: boolean;
  redirectTo: string;
}

type Props = PrivateRouteProps & Omit<RouteProps, "element" | "children">;

export const PrivateRoute: FC<Props> = ({ element, path, isAuth, redirectTo, ...rest }) => {
  return isAuth ? (
    typeof element == typeof CreateCompany ? (
      <Route {...rest} path={path} element={<CreateCompany />} />
    ) : (
      <Route {...rest} path={path} element={<UpdateCompany />} />
    )
  ) : (
    <Navigate to={redirectTo} replace />
  );
};