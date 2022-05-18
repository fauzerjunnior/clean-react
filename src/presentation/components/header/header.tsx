import { Logo } from '@/presentation/components';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Styles from './header-styles.scss';

const Header: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Fauzer</span>
          <Link to="/">Sair</Link>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
