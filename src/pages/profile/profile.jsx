import React, { useEffect } from 'react';
import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink as Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser, logout } from '../../services/actions/user-authentication';
import OrdersPage from '../orders-page/orders-page';
import { useForm } from '../../hooks/use-form';

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.userAuthReducer.user);

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

  const submitChangeUser = (event) => {
    event.preventDefault();
    dispatch(changeUser(values));
  };

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      history.push('/login');
    });
  };

  const { path } = useRouteMatch();

  return (
    <div className={`text text_type_main-default ${styles.container}`}>
      <nav className={`${styles.navigation}`}>
        <ul className={`text_type_main-medium ${styles.list}`}>
          <li>
            <Link
              className={`text_color_inactive ${styles.link}`}
              activeClassName={`${styles.link_type_active}`}
              to={'/profile'}
              exact
            >
              Профиль
            </Link>
          </li>
          <li>
            <Link
              className={`text_color_inactive ${styles.link}`}
              activeClassName={`${styles.link_type_active}`}
              to={'/profile/orders'}
              exact
            >
              История заказов
            </Link>
          </li>
          <li>
            <Link
              className={`text_color_inactive ${styles.link}`}
              activeClassName={`${styles.link_type_active}`}
              to={'/login'}
              onClick={handleLogout}
            >
              Выход
            </Link>
          </li>
        </ul>
        <p className={`text_color_inactive ${styles.navigation__text}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Switch>
        <Route
          path={`${path}`}
          exact
        >
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
              <EmailInput
                onChange={handleChange}
                value={values.email}
                name={'email'}
                icon='EditIcon'
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
        </Route>
        <Route
          path={`${path}/orders`}
          exact
        >
          <OrdersPage />
        </Route>
      </Switch>
    </div>
  );
}

export default Profile;
