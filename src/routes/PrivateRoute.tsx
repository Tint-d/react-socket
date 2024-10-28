import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { paths } from "./paths";

const PrivateRoute = ({ element }: { element: ReactNode }) => {
  return isAuthenticated() ? element : <Navigate to={paths.Login} />;
};

export default PrivateRoute;

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
