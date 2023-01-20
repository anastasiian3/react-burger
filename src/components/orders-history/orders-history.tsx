import React from 'react';
import { useSelector } from 'react-redux';
import OrderItem from '../order-item/order-item';
import { getOrders } from '../../utils/selectors';
import Loader from '../loader/loader';
import styles from './orders-history.module.css';

function OrdersHistory() {
  const orders = useSelector(getOrders);

  return orders?.length === 0 ? (
    <Loader />
  ) : (
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
