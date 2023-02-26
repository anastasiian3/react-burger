import React from 'react';
import { useOwnSelector as useSelector } from '../../services/types';
import styles from './orders-status.module.css';

function OrdersStatus() {
  const { orders, totalToday, total } = useSelector((state) => state.wsReducer.data);
  const totalFormatted = total?.toLocaleString();
  const statusDone = orders?.filter((item) => item.status === 'done');
  const statusInProgress = orders?.filter((item) => item.status !== 'done');

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.status_container} mb-15`}>
        <div className={`${styles.orders_container}`}>
          <h2 className={'text text_type_main-medium mb-6'}>Готовы:</h2>
          <ul className={styles.order_status}>
            {statusDone?.slice(0, 20).map((order) => {
              return (
                <li
                  key={order._id}
                  className={`${styles.done} text text_type_digits-default mb-2`}
                >
                  #{order.number}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={`${styles.orders_container}`}>
          <h2 className={'text text_type_main-medium mb-6'}>В работе:</h2>
          <ul className={styles.order_status}>
            {statusInProgress?.length === 0 ? (
              <p className={`text text_type_main-default`}>Пока ничего не готовим</p>
            ) : (
              statusInProgress?.slice(0, 20).map((order) => {
                return (
                  <li
                    key={order._id}
                    className={`text text_type_digits-default mb-2`}
                  >
                    {order.number}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
      <div className={`mb-15`}>
        <h2 className={'text text_type_main-medium'}>Выполнено за все время:</h2>
        <p className={`text text_type_digits-large ${styles.total_number}`}>{totalFormatted}</p>
      </div>
      <div className={`mb-15`}>
        <h2 className={'text text_type_main-medium'}>Выполнено за сегодня:</h2>
        <p className={`text text_type_digits-large ${styles.total_number}`}>{totalToday}</p>
      </div>
    </div>
  );
}

export default OrdersStatus;
