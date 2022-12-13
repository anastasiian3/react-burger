import React from 'react';
import styles from '../forms.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../services/actions/user-authentication';
import { getCookie } from '../../utils/cookies';
import { useForm } from '../../utils/utils';

function Register() {
  const dispatch = useDispatch();
  const cookie = getCookie('accessToken');

  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmitInfo = (event) => {
    event.preventDefault();
    dispatch(userRegister(values));
  };

  if (cookie) {
    return <Redirect to={'/'} />;
  }
  return (
    <div className={`${styles.container}`}>
      <form onSubmit={handleSubmitInfo}>
        <fieldset className={`${styles.fieldset}`}>
          <h2 className={`text text_type_main-medium`}>Регистрация</h2>
          <Input
            type={'text'}
            value={values.name}
            name={'name'}
            onChange={handleChange}
            size={'default'}
            placeholder={'Имя'}
          />
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={'email'}
            placeholder='E-mail'
            isIcon={false}
          />
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={'password'}
          />
          <Button
            htmlType={'submit'}
            size={'medium'}
            disabled={!values.name || !values.email || !values.password}
          >
            Зарегистрироваться
          </Button>
          <div className={`${styles.info}`}>
            <div className={`${styles.info__container}`}>
              <p className={`text text_type_main-default text_color_inactive`}>Уже зарегистрированы?</p>
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

export default Register;
