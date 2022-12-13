import React from 'react';
import styles from './not-found-404.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function NotFound404() {
  return (
    <div className={`${styles.container}`}>
      <h2 className={`text text_type_main-large`}>Страница не найдена</h2>
      <div className={`${styles.info}`}>
        <p className={`text text_type_main-medium`}>Такой заправочной станции не существует.</p>
        <Link
          className={`text text_type_main-medium ${styles.info__link}`}
          to={'/'}
        >
          Может быть, по космическому бургеру? <BurgerIcon type='success' />
        </Link>
      </div>
    </div>
  );
}

export default NotFound404;
