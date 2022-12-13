import React, { useState } from 'react';
import styles from '../forms.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../services/actions/user-authentication';
import { getCookie } from '../../utils/cookies';

function ForgotPassword() {
  const dispatch = useDispatch();
  const isPasswordSuccess = useSelector((state) => state.userAuthReducer.forgotPasswordSuccess);
  const [form, changeForm] = useState({
    email: '',
  });

  const onChange = (event) => {
    changeForm({ ...form, [event.target.name]: event.target.value });
  };

  if (isPasswordSuccess) {
    return <Redirect to={'/reset-password'} />;
  }

  const handleSubmitEmailInfo = (event) => {
    event.preventDefault();
    console.log(form);
    dispatch(forgotPassword(form));
  };
  const cookie = getCookie('accessToken');
  if (cookie) {
    return <Redirect to={'/'} />;
  }
  return (
    <div className={`${styles.container}`}>
      <form onSubmit={handleSubmitEmailInfo}>
        <fieldset className={`${styles.fieldset}`}>
          <h2 className={`text text_type_main-medium`}>Восстановление пароля</h2>
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={'email'}
            placeholder={'Укажите e-mail'}
            isIcon={false}
            extraClass='mb-2'
          />
          <Button
            htmlType={'submit'}
            size={'medium'}
          >
            Восстановить
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

export default ForgotPassword;
