import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OrdersHistory from '../../components/orders-history/orders-history';
import UserMenu from '../../components/user-menu/user-menu';
import { closeConnectionWebSocket, startConnectionWebSocket } from '../../services/actions/web-socket';
import { wsUrl } from '../../utils/const';
import { getCookie } from '../../utils/cookies';
import styles from './orders-page.module.css';

function OrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie('accessToken').split('Bearer ')[1];
    dispatch(startConnectionWebSocket(`${wsUrl}?token=${accessToken}`));
    return () => {
      dispatch(closeConnectionWebSocket());
    };
  }, [dispatch]);

  return (
    <div className={`${styles.container}`}>
      <UserMenu />
      <OrdersHistory />
    </div>
  );
}

export default OrdersPage;
