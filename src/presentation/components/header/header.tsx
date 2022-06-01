import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/presentation/components';
import { ApiContext } from '@/presentation/context';
import { useLogout } from '@/presentation/hooks';
import Styles from './header-styles.scss';

const Header: React.FC = () => {
  const logout = useLogout();
  const { getCurrentAccount } = useContext(ApiContext);
  const { name: username } = getCurrentAccount();

  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault();
    logout();
  };

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{username}</span>
          <Link data-testid="logout" to="/" onClick={handleLogout}>
            Sair
          </Link>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
