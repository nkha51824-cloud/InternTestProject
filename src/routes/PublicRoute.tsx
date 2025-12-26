import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { JSX } from "react/jsx-runtime";

interface Props {
  children: JSX.Element;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const token = Cookies.get("token");
  return token ? <Navigate to="/courses" replace /> : children;
};

export default PublicRoute;
