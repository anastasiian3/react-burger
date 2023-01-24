import React, { FormEvent } from 'react';
import styles from '../forms.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { userRegister } from '../../services/actions/user-authentication';
import { useForm } from '../../hooks/use-form';
import { useOwnDispatch as useDispatch } from '../../services/types';

function Register() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmitInfo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(userRegister(values));
    history.replace({
      pathname: '/',
    });
  };

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
