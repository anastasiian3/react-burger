import React from 'react';
import styles from '../forms.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../services/actions/user-authentication';
import { getCookie } from '../../utils/cookies';
import { useForm } from '../../hooks/use-form';

function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { values, handleChange } = useForm({
    email: '',
  });

  const handleSubmitEmailInfo = (event) => {
    event.preventDefault();
    dispatch(forgotPassword(values));
    history.replace({
      pathname: '/reset-password',
      state: 'reset-password',
    });
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
            onChange={handleChange}
            value={values.email}
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
