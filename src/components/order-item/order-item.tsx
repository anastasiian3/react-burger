import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { TOrder } from '../../services/reducers/web-socket';
import { Ingredient } from '../../utils/const';
import { getAllIngredients } from '../../utils/selectors';
import OrderIcon from '../order-icon/order-icon';
import styles from './order-item.module.css';

const OrderItem: FC<TOrder> = (props) => {
  const { createdAt, ingredients, _id, number, name, status } = props;
  const allIngredients = useSelector(getAllIngredients);
  const isOrderDone = (status: string) => {
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

  //const ingredientsInOrder = ingredients.map((id) => id !== null && allIngredients.find((ingr) => ingr._id === id));

  // const totalOrderSum = ingredientsInOrder.reduce((total, item) => {
  //   total + (item.type === Ingredient.Bun ? item.price * 2 : item.price), 0;
  // });

  const ingredientsInOrder = useMemo(() => {
    return ingredients?.map((id) => {
      return allIngredients?.find((ingr) => {
        // @ts-ignore
        return ingr._id === id;
      });
    });
  }, [ingredients, allIngredients]);

  const totalOrderSum = useMemo(() => {
    return ingredientsInOrder?.reduce((sum, item) => {
      if (item?.type === Ingredient.Bun) {
        return (sum += item.price * 2);
      }
      return (sum += item ? item.price : 0);
    }, 0);
  }, [ingredientsInOrder]);

  const isDone = isOrderDone(status) === 'Выполнен' ? `${styles.status_done}` : ``;

  const arrayWithUniqueIngredients = Array.from(new Set(ingredientsInOrder));

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
          <OrderIcon ingredients={arrayWithUniqueIngredients} />
          <div className={`${styles.price} text text_type_digits-default`}>
            {totalOrderSum}
            <CurrencyIcon type={'primary'} />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderItem;
