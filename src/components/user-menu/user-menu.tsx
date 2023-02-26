import React from 'react';
import styles from './user-menu.module.css';
import { NavLink as Link, useHistory, useLocation } from 'react-router-dom';
import { logout } from '../../services/actions/user-authentication';
import { useOwnDispatch as useDispatch } from '../../services/types';

function UserMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

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
      <p className={`text text_type_main-default text_color_inactive ${styles.navigation__text}`}>
        {location.pathname.includes('/profile/orders')
          ? 'В этом разделе вы можете просмотреть свою историю заказов'
          : 'В этом разделе вы можете изменить свои персональные данные'}
      </p>
    </nav>
  );
}

export default UserMenu;
