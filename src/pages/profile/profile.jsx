import React, { useState } from 'react';
import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink as Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/actions/user-authentication';
import OrdersPage from '../orders-page/orders-page';

function Profile() {
  const dispatch = useDispatch();
  //const location = useLocation();
  const history = useHistory();
  const user = useSelector((state) => state.userAuthReducer.user);
  let userEmail = user?.email;
  let userName = user?.name;

  console.log(user);
  // const [form, changeForm] = useState({
  //   name: user.name,
  //   email: user.email,
  //   password: '',
  // });

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState('');

  const onChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  };
  const onChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  // const onChangeEmail = (event) => {
  //   setEmail({ [event.target.name]: event.target.value });
  // };
  // const onChangePassword = (event) => {
  //   setPassword({ [event.target.name]: event.target.value });
  // };

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      history.push('/login');
    });
  };

  const { path, url } = useRouteMatch();

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
          <form>
            <fieldset className={`${styles.fieldset}`}>
              <Input
                value={name}
                name={'name'}
                icon='EditIcon'
                onChange={onChangeName}
                size={'default'}
                placeholder={'Имя'}
              />
              <EmailInput
                onChange={onChangeEmail}
                value={email}
                name={'email'}
                icon='EditIcon'
                placeholder='Логин'
              />
              <PasswordInput
                onChange={onChangePassword}
                value={password}
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
              >
                Oтмена
              </Button>
              <Button
                //disabled={!values.email && !values.password && !values.name}
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
