import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from '../header-button/header-button';
import { NavLink as Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.header__nav} pt-4 pb-4`}>
        <ul className={`${styles.header__list}`}>
          <li>
            <HeaderButton
              icon={BurgerIcon}
              text={'Конструктор'}
              to={'/'}
              exact
            ></HeaderButton>
          </li>
          <li>
            <HeaderButton
              icon={ListIcon}
              text={'Лента заказов'}
              to={'/feed'}
              exact
            ></HeaderButton>
          </li>
        </ul>
        <Link to={'/'}>
          <Logo />
        </Link>
        <HeaderButton
          icon={ProfileIcon}
          text={'Личный кабинет'}
          to={'/profile'}
          exact
        ></HeaderButton>
      </nav>
    </header>
  );
};

export default AppHeader;
