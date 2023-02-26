import React, { useEffect, SyntheticEvent, FC } from 'react';
import styles from './user-info.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { changeUser } from '../../services/actions/user-authentication';
import { useForm } from '../../hooks/use-form';
import { getDetailedUser } from '../../utils/selectors';
import { useOwnDispatch as useDispatch, useOwnSelector as useSelector } from '../../services/types';

const UserInfo: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getDetailedUser);

  const serverValues = {
    name: user.name,
    email: user.email,
    password: '',
  };

  const { values, handleChange, setValues } = useForm(serverValues);

  const areValuesChanged =
    values.name !== serverValues.name || values.email !== serverValues.email || values.password !== serverValues.password;

  useEffect(() => {
    if (user.name && user.email) {
      setValues({
        name: user.name,
        email: user.email,
        password: serverValues.password,
      });
    }
  }, [user.name, user.email]);

  const deleteUserChanges = () => {
    setValues(serverValues);
  };

  const submitChangeUser = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(changeUser(values));
  };

  return (
    <form onSubmit={submitChangeUser}>
      <fieldset className={`${styles.fieldset}`}>
        <Input
          value={values.name}
          name={'name'}
          icon='EditIcon'
          onChange={handleChange}
          size={'default'}
          placeholder={'Имя'}
        />
        <Input
          onChange={handleChange}
          value={values.email}
          name={'email'}
          icon={'EditIcon'}
          placeholder='Логин'
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          placeholder='Пароль'
          icon='EditIcon'
        />
      </fieldset>
      <div className={`${styles.buttons}`}>
        <Button
          type='secondary'
          size='medium'
          htmlType='reset'
          onClick={deleteUserChanges}
        >
          Oтмена
        </Button>
        <Button
          disabled={(!values.name && !values.email && !values.password) || !areValuesChanged}
          type={'primary'}
          size={'medium'}
          htmlType={'submit'}
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default UserInfo;
