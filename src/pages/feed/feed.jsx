import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import OrderItem from '../../components/order-item/order-item';
import OrdersStatus from '../../components/orders-status/orders-status';
import { closeConnectionWebSocket, startConnectionWebSocket } from '../../services/actions/web-socket';
import { wsUrl } from '../../utils/const';
import styles from './feed.module.css';

function Feed() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startConnectionWebSocket(`${wsUrl}/all`));
    return () => {
      dispatch(closeConnectionWebSocket());
    };
  }, [dispatch]);

  const orders = useSelector((state) => state.wsReducer.orders);
  console.log(orders);
  return orders.length === 0 ? (
    <Loader />
  ) : (
    <div className={`${styles.feed}`}>
      <h1 className={`mt-10 mb-5 text text_color_primary text_type_main-large`}>Лента заказов</h1>
      <div className={`${styles.container}`}>
        <ul className={`${styles.order_list}`}>
          {orders?.map((order) => {
            return (
              <OrderItem
                key={order._id}
                style={{ maxWidth: '584 px', minWidth: '584 px' }}
                {...order}
              />
            );
          })}
        </ul>
        <OrdersStatus />
      </div>
    </div>
  );
}

export default Feed;
