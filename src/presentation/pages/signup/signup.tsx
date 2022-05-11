import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components';
import Context from '@/presentation/context/form-context';
import { Validation } from '@/presentation/protocols/validation';
import React, { useEffect, useState } from 'react';
import Styles from './sign-up-styles.scss';

type Props = {
  validation: Validation;
};

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  });

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name)
    });
  }, [state.name]);

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu name" />
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite a sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita a sua senha"
          />
          <button
            data-testid="submit"
            disabled
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Voltar para login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
