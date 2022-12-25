import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { INGREDIENTS } from '../../utils/const';
import OrderIcon from '../order-icon/order-icon';
import styles from './order-item.module.css';

function OrderItem(props) {
  const { createdAt, ingredients, _id, number, name, status } = props;
  const allIngredients = useSelector((state) => state.ingredientsReducer.ingredients);
  const isOrderDone = (status) => {
    if (status === 'done') {
      return 'Выполнен';
    } else if (status === 'pending') {
      return 'Готовится';
    } else if (status === 'created') {
      return 'Создан';
    }
  };

  const location = useLocation();

  const isStatusShown = location?.pathname.includes('/profile/orders') ? isOrderDone(status) : null;

  const ingredientsInOrder = ingredients.map((id) => id !== null && allIngredients.find((ingr) => ingr._id === id));

  const totalOrderSum = ingredientsInOrder?.reduce(
    (total, item) => total + (item.type === INGREDIENTS.BUN ? item.price * 2 : item.price),
    0
  );

  const isDone = isOrderDone(status) === 'Выполнен' ? `${styles.status_done}` : ``;

  return (
    <li className={`${styles.item} pt-6 pl-6 pr-6`}>
      <Link
        to={{
          pathname: `${location.pathname}/${_id}`,
          state: { background: location },
        }}
        className={styles.link}
      >
        <div className={`${styles.info} mb-6`}>
          <p className={`text text_type_digits-default`}>{`#${number}`}</p>
          <FormattedDate
            className={`text text_type_main-default text_color_inactive`}
            date={new Date(createdAt)}
          />
        </div>
        <h3 className={`text text_type_main-medium`}>{name}</h3>
        <p className={`${isDone} text text_type_main-default`}>{isStatusShown}</p>
        <div className={`${styles.info} mt-6 mb-6`}>
          <OrderIcon ingredients={ingredientsInOrder} />
          <div className={`${styles.price} text text_type_digits-default`}>
            {totalOrderSum} <CurrencyIcon type={'primary'} />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default OrderItem;
