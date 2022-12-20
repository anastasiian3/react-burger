import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/order-item/order-item';
import { closeConnectionWebSocket, startTokenConnectionWebSocket } from '../../services/actions/web-socket';
import styles from './orders-history.module.css';

function OrdersHistory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startTokenConnectionWebSocket());
    return () => {
      dispatch(closeConnectionWebSocket());
    };
  }, [dispatch]);

  const orders = useSelector((store) => store.wsReducer.orders);

  return (
    <ul className={`${styles.order_list}`}>
      {orders?.length > 0 &&
        [...orders].reverse().map((order) => {
          return (
            <OrderItem
              key={order._id}
              {...order}
            />
          );
        })}
    </ul>
  );
}

export default OrdersHistory;
