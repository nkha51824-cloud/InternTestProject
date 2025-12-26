import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { JSX } from 'react/jsx-runtime';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = Cookies.get('token');
  if (!token) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
