import React, { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import OrderItem from '../../components/order-item/order-item';
import OrdersStatus from '../../components/orders-status/orders-status';
import { closeConnectionWebSocket, startConnectionWebSocket } from '../../services/actions/web-socket';
import { useOwnDispatch as useDispatch } from '../../services/types';
import { wsUrl } from '../../utils/const';
import { getOrders } from '../../utils/selectors';
import styles from './feed.module.css';

const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startConnectionWebSocket(`${wsUrl}/all`));
    return () => {
      dispatch(closeConnectionWebSocket());
    };
  }, [dispatch]);

  const orders = useSelector(getOrders);

  return orders?.length === 0 ? (
    <Loader />
  ) : (
    <div className={`${styles.feed}`}>
      <h1 className={`mt-10 mb-5 text text_color_primary text_type_main-large`}>Лента заказов</h1>
      <div className={`${styles.container}`}>
        <ul className={`${styles.order_list}`}>
          {orders &&
            orders.map((order) => {
              return (
                <OrderItem
                  key={order._id}
                  {...order}
                />
              );
            })}
        </ul>
        <OrdersStatus />
      </div>
    </div>
  );
};

export default Feed;
