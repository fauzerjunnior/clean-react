import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginFactory } from '@/main/factories/pages/login/login-factory';
import { SignUpFactory } from '@/main/factories/pages/signup/signup-factory';
import { SurveyList } from '@/presentation/pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginFactory />} />
        <Route path="/signup" element={<SignUpFactory />} />
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
