import React from 'react';
import styles from './user-menu.module.css';

import { NavLink as Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/actions/user-authentication';

function UserMenu() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      history.push('/login');
    });
  };

  return (
    <nav className={`${styles.navigation}`}>
      <ul className={`text_type_main-medium ${styles.list}`}>
        <li>
          <Link
            className={`text_color_inactive ${styles.link}`}
            activeClassName={`${styles.link_type_active}`}
            to={'/profile'}
            exact
          >
            Профиль
          </Link>
        </li>
        <li>
          <Link
            className={`text_color_inactive ${styles.link}`}
            activeClassName={`${styles.link_type_active}`}
            to={'/profile/orders'}
            exact
          >
            История заказов
          </Link>
        </li>
        <li>
          <Link
            className={`text_color_inactive ${styles.link}`}
            activeClassName={`${styles.link_type_active}`}
            to={'/login'}
            onClick={handleLogout}
          >
            Выход
          </Link>
        </li>
      </ul>
      <p className={`text_color_inactive ${styles.navigation__text}`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
}

export default UserMenu;
