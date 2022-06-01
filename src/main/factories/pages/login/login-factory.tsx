import { makeLoginValidation } from '@/main/factories/pages';
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import { Login } from '@/presentation/pages';
import React from 'react';

export const LoginFactory: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  );
};
