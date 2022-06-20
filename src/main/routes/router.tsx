import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  LoginFactory,
  SignUpFactory,
  SurveyListFactory
} from '@/main/factories/pages';
import { ApiContext } from '@/presentation/context';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter';
import { PrivateRoute } from '@/presentation/components';
import { SurveyResult } from '@/presentation/pages';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginFactory />} />
          <Route path="/signup" element={<SignUpFactory />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <SurveyListFactory />
              </PrivateRoute>
            }
          />
          <Route
            path="/surveys"
            element={
              <PrivateRoute>
                <SurveyResult />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
