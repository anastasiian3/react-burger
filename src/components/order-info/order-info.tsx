import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { closeConnectionWebSocket, startConnectionWebSocket } from '../../services/actions/web-socket';
import { Ingredient, wsUrl } from '../../utils/const';
import { getCookie } from '../../utils/cookies';
import styles from './order-info.module.css';
import Loader from '../loader/loader';
import { getAllIngredients, getOrders } from '../../utils/selectors';
import { useOwnDispatch as useDispatch, useOwnSelector as useSelector } from '../../services/types';
import { IIngredient } from '../../services/types/ingredient';
import { TUseLocation } from '../../services/types/pages';

function OrderInfo({ inModal }: { inModal: boolean }) {
  const orders = useSelector(getOrders);
  const allIngredients = useSelector(getAllIngredients);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const selectedOrder = orders?.find((ingr) => ingr._id === id)!;
  const location = useLocation<TUseLocation>();

  useEffect(() => {
    if (location?.pathname.includes('/profile/orders')) {
      const token = getCookie('accessToken');
      if (token !== undefined) {
        const accessToken = token.split('Bearer ')[1];
        dispatch(startConnectionWebSocket(`${wsUrl}?token=${accessToken}`));
      }
    } else {
      dispatch(startConnectionWebSocket(`${wsUrl}/all`));
    }
    return () => {
      dispatch(closeConnectionWebSocket());
    };
  }, [dispatch, location?.pathname]);

  const isOrderDone = (status: string) => {
    if (status === 'done') {
      return 'Выполнен';
    } else if (status === 'pending') {
      return 'Готовится';
    } else if (status === 'created') {
      return 'Создан';
    }
  };

  const selectedOrderStatus = isOrderDone(selectedOrder?.status);
  const isDone = isOrderDone(selectedOrder?.status) === 'Выполнен' ? `${styles.status__done}` : ``;

  const ingredientsInSelectedOrder = useMemo(() => {
    return selectedOrder?.ingredients.map((id) => {
      return allIngredients?.find((ingr) => {
        return ingr?._id === id;
      });
    });
  }, [selectedOrder?.ingredients, allIngredients]);

  const totalOrderSum = useMemo(() => {
    return ingredientsInSelectedOrder?.reduce(
      (total, ingredient) => total + (ingredient?.type === Ingredient.Bun ? ingredient.price * 2 : ingredient!.price),
      0
    );
  }, [ingredientsInSelectedOrder]);

  const getQuantityOfIngredients = (ingredients: IIngredient): number => {
    let count = 0;
    ingredientsInSelectedOrder?.forEach((ingr) => {
      if (ingr?._id === ingredients._id) {
        count++;
      }
    });
    return count;
  };

  const arrayWithUniqueIngredients = Array.from(new Set(ingredientsInSelectedOrder));

  const numberStyles = !inModal ? `${styles.number}` : '';

  return orders.length === 0 ? (
    <Loader />
  ) : (
    <section className={`${styles.container}`}>
      <p className={`text text_type_digits-default mb-10 ${numberStyles}`}>#{selectedOrder?.number}</p>
      <h1 className={`text text_type_main-medium mb-2`}>{selectedOrder?.name}</h1>
      <p className={`text text_type_main-default mb-15 ${isDone}`}>{selectedOrderStatus}</p>
      <p className={`text text_type_main-medium mb-2`}>Состав:</p>
      <ul className={`${styles.list}`}>
        {arrayWithUniqueIngredients?.map((item, index) => {
          return (
            <Link
              to={`/ingredients/${item?._id}`}
              className={`${styles.link}`}
              key={index}
            >
              <li className={`${styles.item} mb-3 pr-2`}>
                <div className={`${styles.info__element}`}>
                  <img
                    src={item?.image_mobile}
                    alt={item?.name}
                    className={`${styles.icon}`}
                  />
                  <span className={`text text_type_main-default`}>{item?.name}</span>
                </div>
                <div className={`text_type_digits-default ${styles.info__element}`}>
                  <p>
                    {getQuantityOfIngredients(item!)} x {item?.price}
                  </p>
                  <CurrencyIcon type={'primary'} />
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <div className={styles.info}>
        <FormattedDate
          date={new Date(selectedOrder?.createdAt)}
          className={`text text_type_main-default text_color_inactive`}
        />
        <div className={styles.info__element}>
          <p className={`${styles.total} text_type_digits-default`}>{totalOrderSum}</p>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </section>
  );
}

export default OrderInfo;
