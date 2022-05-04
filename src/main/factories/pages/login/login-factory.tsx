import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory';
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import { Login } from '@/presentation/pages';
import React from 'react';

export const LoginFactory: React.FC = () => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validationComposite = makeLoginValidation();

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
};
