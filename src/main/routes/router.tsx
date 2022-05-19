import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginFactory } from '@/main/factories/pages/login/login-factory';
import { SignUpFactory } from '@/main/factories/pages/signup/signup-factory';
import { SurveyList } from '@/presentation/pages';
import { ApiContext } from '@/presentation/context';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter';
import { PrivateRoute } from '@/presentation/components';

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
                <SurveyList />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
