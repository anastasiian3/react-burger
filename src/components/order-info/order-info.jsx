import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { closeConnectionWebSocket, startConnectionWebSocket } from '../../services/actions/web-socket';
import { INGREDIENTS, wsUrl } from '../../utils/const';
import { getCookie } from '../../utils/cookies';
import styles from './order-info.module.css';
import PropTypes from 'prop-types';
import Loader from '../loader/loader';

function OrderInfo({ inModal }) {
  const orders = useSelector((store) => store.wsReducer.orders);
  const allIngredients = useSelector((state) => state.ingredientsReducer.ingredients);
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedOrder = orders.find((ingr) => ingr._id === id);
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname.includes('/profile/orders')) {
      const accessToken = getCookie('accessToken').split('Bearer ')[1];
      dispatch(startConnectionWebSocket(`${wsUrl}?token=${accessToken}`));
    } else {
      dispatch(startConnectionWebSocket(`${wsUrl}/all`));
    }
    return () => {
      dispatch(closeConnectionWebSocket());
    };
  }, [dispatch, location?.pathname]);

  const isOrderDone = (status) => {
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

  const ingredientsInSelectedOrder = selectedOrder?.ingredients.map(
    (id) => id !== null && allIngredients.find((ingr) => ingr._id === id)
  );

  const totalOrderSum = ingredientsInSelectedOrder?.reduce(
    (total, ingredient) => total + (ingredient.type === INGREDIENTS.BUN ? ingredient.price * 2 : ingredient.price),
    0
  );

  const getQuantityOfIngredients = (ingredients) => {
    let count = 0;
    ingredientsInSelectedOrder.forEach((ingr) => {
      if (ingr._id === ingredients._id) {
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
              to={`/ingredients/${item._id}`}
              className={`${styles.link}`}
              key={index}
            >
              <li className={`${styles.item} mb-3 pr-2`}>
                <div className={`${styles.info__element}`}>
                  <img
                    src={item.image_mobile}
                    alt={item.name}
                    className={`${styles.icon}`}
                  />
                  <span className={`text text_type_main-default`}>{item.name}</span>
                </div>
                <div className={`text_type_digits-default ${styles.info__element}`}>
                  <p>
                    {getQuantityOfIngredients(item)} x {item.price}
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

OrderInfo.propTypes = {
  inModal: PropTypes.bool.isRequired,
};

export default OrderInfo;
