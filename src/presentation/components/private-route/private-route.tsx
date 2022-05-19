/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { RouteProps, Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = () => {
  const token = false;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return null;
};

export default PrivateRoute;
