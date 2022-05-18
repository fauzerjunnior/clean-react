/* eslint-disable react/no-unused-prop-types */
import { SurveyList } from '@/presentation/pages';
import '@/presentation/styles/global.scss';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginFactory } from '../factories/pages/login/login-factory';
import { SignUpFactory } from '../factories/pages/signup/signup-factory';

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
