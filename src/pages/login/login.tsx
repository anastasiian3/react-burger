import React, { SyntheticEvent } from 'react';
import styles from '../forms.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { authorizeUser } from '../../services/actions/user-authentication';
import { getCookie } from '../../utils/cookies';
import { useForm } from '../../hooks/use-form';
import { TUseLocation } from '../../services/types/pages';
import { useOwnDispatch as useDispatch } from '../../services/types';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TUseLocation>();

  const cookie = getCookie('accessToken');

  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const handleSubmitUserInfo = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(authorizeUser(values)).then(() => {
      history.push(location.state?.from || '/');
    });
  };

  if (cookie) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <div className={`${styles.container}`}>
      <form onSubmit={handleSubmitUserInfo}>
        <fieldset className={`${styles.fieldset}`}>
          <h2 className={`text text_type_main-medium`}>Вход</h2>
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={'email'}
            placeholder='E-mail'
            isIcon={false}
            extraClass='mb-2'
          />
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={'password'}
            extraClass='mb-2'
          />
          <Button
            htmlType={'submit'}
            size={'medium'}
            disabled={!values.email || !values.password}
          >
            Войти
          </Button>
          <div className={`${styles.info}`}>
            <div className={`${styles.info__container}`}>
              <p className={`text text_type_main-default text_color_inactive`}>Вы — новый пользователь?</p>
              <Link
                className={`text text_type_main-default ${styles.info__link}`}
                to={'/register'}
              >
                Зарегистрироваться
              </Link>
            </div>
            <div className={`${styles.info__container}`}>
              <p className={`text text_type_main-default text_color_inactive`}>Забыли пароль?</p>
              <Link
                className={`text text_type_main-default ${styles.info__link}`}
                to={'/forgot-password'}
              >
                Восстановить пароль
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
