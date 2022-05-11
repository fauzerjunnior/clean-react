import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components';
import Context from '@/presentation/context/form-context';
import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './sign-up-styles.scss';

const SignUp: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form className={Styles.form}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu name" />
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
          <button className={Styles.submit} type="submit">
            Entrar
          </button>
          <Link to="/login" className={Styles.link}>
            Voltar para login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
