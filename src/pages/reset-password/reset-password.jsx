import React from 'react';
import styles from '../forms.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/actions/user-authentication';
import { getCookie } from '../../utils/cookies';
import { useForm } from '../../hooks/use-form';

function ResetPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isResetSuccess = useSelector((state) => state.userAuthReducer.resetPasswordSuccess);

  const { values, handleChange } = useForm({
    password: '',
    token: '',
  });

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (values.password && values.token) {
      dispatch(resetPassword(values));
    }
  };
  const cookie = getCookie('accessToken');

  if (cookie || isResetSuccess) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  if (history.location?.state !== 'reset-password') {
    return <Redirect to={'/'} />;
  }

  return (
    <div className={`${styles.container}`}>
      <form onSubmit={handleResetPassword}>
        <fieldset className={`${styles.fieldset}`}>
          <h2 className={`text text_type_main-medium`}>Восстановление пароля</h2>
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={'password'}
            extraClass='mb-2'
            placeholder='Введите новый пароль'
          />
          <Input
            value={values.token}
            name={'token'}
            onChange={handleChange}
            size={'default'}
            placeholder={'Введите код из письма'}
            type={'text'}
          />
          <Button
            htmlType={'submit'}
            size={'medium'}
            disabled={!values.password || !values.token}
          >
            Сохранить
          </Button>
          <div className={`${styles.info}`}>
            <div className={`${styles.info__container}`}>
              <p className={`text text_type_main-default text_color_inactive`}>Вспомнили пароль?</p>
              <Link
                className={`text text_type_main-default ${styles.info__link}`}
                to={'/login'}
              >
                Войти
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ResetPassword;
