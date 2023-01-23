import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from '../header-button/header-button';
import { NavLink as Link, useLocation } from 'react-router-dom';
import { getUserName, isUserAuth } from '../../utils/selectors';
import { useOwnSelector as useSelector } from '../../services/types';

const AppHeader = () => {
  const isAuth = useSelector(isUserAuth);
  const userName = useSelector(getUserName);
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={`${styles.header__nav} pt-4 pb-4`}>
        <ul className={`${styles.header__list}`}>
          <li className={`${styles.header__item}`}>
            {/* <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} /> */}
            <HeaderButton
              text={'Конструктор'}
              to={'/'}
              exact
            >
              <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
            </HeaderButton>
          </li>
          <li className={`${styles.header__item}`}>
            <HeaderButton
              text={'Лента заказов'}
              to={'/feed'}
              exact
            >
              <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
            </HeaderButton>
          </li>
        </ul>
        <Link
          to={'/'}
          className={styles.logo}
        >
          <Logo />
        </Link>
        <ul className={`${styles.header__list}`}>
          <li className={`${styles.header__item}`}>
            <HeaderButton
              text={isAuth ? userName : 'Личный кабинет'}
              to={'/profile'}
              exact
            >
              <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
            </HeaderButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
