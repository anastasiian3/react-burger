import React, { useState } from 'react';
import styles from '../forms.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/actions/user-authentication';
import { getCookie } from '../../utils/cookies';

function ResetPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isResetSuccess = useSelector((state) => state.userAuthReducer.resetPasswordSuccess);
  const [form, changeForm] = useState({
    password: '',
    token: '',
  });
  const onChange = (event) => {
    changeForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    console.log(form);

    const { password, token } = form;
    if (password && token) {
      dispatch(resetPassword(form));
    }
  };
  const cookie = getCookie('accessToken');

  if (cookie || isResetSuccess) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <div className={`${styles.container}`}>
      <form onSubmit={handleResetPassword}>
        <fieldset className={`${styles.fieldset}`}>
          <h2 className={`text text_type_main-medium`}>Восстановление пароля</h2>
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={'password'}
            extraClass='mb-2'
            placeholder='Введите новый пароль'
          />
          <Input
            value={form.token}
            name={'token'}
            onChange={onChange}
            size={'default'}
            placeholder={'Введите код из письма'}
            type={'text'}
          />
          <Button
            htmlType={'submit'}
            size={'medium'}
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
