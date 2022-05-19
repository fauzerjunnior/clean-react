import { makeSignUpValidation } from '@/main/factories/pages';
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account-factory';
import { SignUp } from '@/presentation/pages';
import React from 'react';

export const SignUpFactory: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  );
};
