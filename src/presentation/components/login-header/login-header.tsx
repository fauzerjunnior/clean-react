import Logo from '@/presentation/components/logo/logo';
import React, { memo } from 'react';
import Styles from './login-header-styles.scss';

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <Logo />
      <h1>4DEV - Enquetes para programadores</h1>
    </header>
  );
};

export default memo(LoginHeader);
