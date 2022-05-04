import '@/presentation/styles/global.scss';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginFactory } from '../factories/pages/login/login-factory';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginFactory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
