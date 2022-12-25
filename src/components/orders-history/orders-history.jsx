import React from 'react';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/order-item/order-item';
import styles from './orders-history.module.css';

function OrdersHistory() {
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
