import React, { memo, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/presentation/components';
import { ApiContext } from '@/presentation/context';
import Styles from './header-styles.scss';

const Header: React.FC = () => {
  const { setCurrentAccount } = useContext(ApiContext);
  const navigate = useNavigate();

  const logout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault();

    setCurrentAccount(undefined);
    navigate('/login', { replace: true });
  };

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Fauzer</span>
          <Link data-testid="logout" to="/" onClick={logout}>
            Sair
          </Link>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
