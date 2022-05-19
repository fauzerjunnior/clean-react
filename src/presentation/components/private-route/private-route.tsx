import React, { useContext } from 'react';
import { RouteProps, Navigate, Routes, Route } from 'react-router-dom';
import { ApiContext } from '@/presentation/context';

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext);

  if (getCurrentAccount()?.accessToken) {
    return (
      <Routes>
        <Route {...props} />
      </Routes>
    );
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
