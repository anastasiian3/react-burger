import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

  const ingredientsInOrder = ingredients.map((id) => allIngredients.find((ingr) => ingr._id === id));

  const totalOrderSum = useMemo(() => {
    return ingredientsInOrder.reduce(
      (total, item) => total + (item.type === INGREDIENTS.BUN ? item.price * 2 : item.price),
      0
    );
  }, [ingredientsInOrder]);

  const idDone = isOrderDone(status) === 'Выполнен' ? `${styles.status_done}` : ``;

  return (
    <li className={`${styles.item} p-6`}>
      <Link
        to={'/login'}
        className={styles.link}
      >
        <div className={`${styles.info} mt-6 mb-6`}>
          <p className={`text text_type_digits-default`}>{`#${number}`}</p>
          <FormattedDate
            className={`text text_type_main-default text_color_inactive`}
            date={new Date(createdAt)}
          />
        </div>
        <h3 className={`text text_type_main-medium mb-2`}>{name}</h3>
        <p className={`${idDone} text text_type_main-default`}>{isOrderDone(status)}</p>
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
