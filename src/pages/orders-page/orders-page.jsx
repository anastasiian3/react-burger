import React from 'react';
import OrdersHistory from '../../components/orders-history/orders-history';
import UserMenu from '../../components/user-menu/user-menu';
import styles from './orders-page.module.css';

function OrdersPage() {
  return (
    <div className={`${styles.container}`}>
      <UserMenu />
      <OrdersHistory />
    </div>
  );
}

export default OrdersPage;
