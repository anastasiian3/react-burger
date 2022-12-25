import styles from './order-details.module.css';
import done from '../../images/done.svg';
import { useSelector } from 'react-redux';
import Loader from '../loader/loader';

const OrderDetails = () => {
  const { orderNumber, orderName } = useSelector((store) => ({
    orderNumber: store.orderReducer.order,
    orderName: store.orderReducer.orderName,
  }));
  return (
    <div className={`pt-30 pr-25 pb-30 pl-25 ${styles.popup}`}>
      {!orderNumber && !orderName ? (
        <>
          <h2 className={`text text_type_main-medium`}>{'Подождите, заказ обрабатывается'}</h2>
          <Loader />
        </>
      ) : (
        <>
          <h2 className={`text text_type_digits-large mb-8 ${styles.order}`}>{orderNumber}</h2>
          <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
          <img
            className={`mb-15`}
            src={done}
            alt='Заказ готовится'
          />
          <p className={`text text_type_main-default mb-2 ${styles.order__info}`}>Ваш заказ "{orderName}" начали готовить</p>
          <span className={`text text_type_main-default text_color_inactive`}>
            Дождитесь готовности на орбитальной станции
          </span>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
