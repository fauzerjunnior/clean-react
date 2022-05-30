import React, { memo, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/presentation/components';
import { ApiContext } from '@/presentation/context';
import Styles from './header-styles.scss';

const Header: React.FC = () => {
  const { getCurrentAccount, setCurrentAccount } = useContext(ApiContext);
  const navigate = useNavigate();
  const { name: username } = getCurrentAccount();

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
          <span data-testid="username">{username}</span>
          <Link data-testid="logout" to="/" onClick={logout}>
            Sair
          </Link>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
