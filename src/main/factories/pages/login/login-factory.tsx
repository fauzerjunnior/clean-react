import { makeLoginValidation } from '@/main/factories/pages';
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import { makeUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory';
import { Login } from '@/presentation/pages';
import React from 'react';

export const LoginFactory: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeUpdateCurrentAccount()}
    />
  );
};
