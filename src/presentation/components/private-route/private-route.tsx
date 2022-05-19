import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ApiContext } from '@/presentation/context';

const PrivateRoute: React.FC = ({ children }: { children: JSX.Element }) => {
  const { getCurrentAccount } = useContext(ApiContext);
  const location = useLocation();

  if (!getCurrentAccount()?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
