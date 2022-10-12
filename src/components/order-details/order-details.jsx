import styles from './order-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import done from '../../images/done.svg';

const OrderDetails = ({ closeModal }) => {
  return (
    <section className={`pt-30 pr-25 pb-30 pl-25 ${styles.popup}`}>
      <button
        className={styles.close_btn}
        onClick={closeModal}
      >
        <CloseIcon type={'primary'} />
      </button>
      <h2 className={`text text_type_digits-large mb-8 ${styles.order}`}>034536</h2>
      <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <img
        className={`mb-15`}
        src={done}
        alt='Заказ готовится'
      />
      <p className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
      <span className={`text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </span>
    </section>
  );
};

export default OrderDetails;
