import React from 'react';
import styles from './profile.module.css';
import { Route, useRouteMatch } from 'react-router-dom';
import OrdersPage from '../orders-page/orders-page';
import UserMenu from '../../components/user-menu/user-menu';
import UserInfo from '../../components/user-info/user-info';

function Profile() {
  const { path } = useRouteMatch();

  return (
    <div className={`text text_type_main-default ${styles.container}`}>
      <UserMenu />
      <Route
        path={`${path}`}
        exact
      >
        <UserInfo />
      </Route>
      <Route
        path={`${path}/orders`}
        exact
      >
        <OrdersPage />
      </Route>
    </div>
  );
}

export default Profile;
