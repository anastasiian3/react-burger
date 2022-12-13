import React, { useState } from 'react';
import styles from '../forms.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../services/actions/user-authentication';
import { getCookie } from '../../utils/cookies';

function Register() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userAuthReducer.user);
  console.log(user);

  const cookie = getCookie('accessToken');
  console.log(cookie);
  const [form, changeForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = form;

  const onChange = (event) => {
    changeForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmitInfo = (event) => {
    event.preventDefault();
    dispatch(userRegister(form));
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
            value={form.name}
            name={'name'}
            onChange={onChange}
            size={'default'}
            placeholder={'Имя'}
          />
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={'email'}
            placeholder='E-mail'
            isIcon={false}
          />
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={'password'}
          />
          <Button
            htmlType={'submit'}
            size={'medium'}
            disabled={!name || !email || !password}
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
