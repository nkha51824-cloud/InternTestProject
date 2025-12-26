import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { JSX } from "react/jsx-runtime";

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = Cookies.get("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
