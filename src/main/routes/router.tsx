import { LoginFactory } from '@/main/factories/pages';
import { SignUp } from '@/presentation/pages';
import '@/presentation/styles/global.scss';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginFactory />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
