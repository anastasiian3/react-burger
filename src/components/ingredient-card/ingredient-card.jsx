import React, { useState } from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const IngredientCard = ({ name, image, price, count }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  //закрытие всех модальных окон
  const closeAllModals = () => {
    setIsModalOpened(false);
  };
  //открытие всех модальных окон
  const openModal = () => {
    setIsModalOpened(true);
  };

  return (
    <article className={`${styles.card}`}>
      {count > 0 && (
        <Counter
          count={count}
          size='default'
          className={`text text_type_digits-default`}
        />
      )}
      <img
        className={`ml-4 mr-4 ${styles.img}`}
        src={image}
        alt={name}
        onClick={openModal}
      />
      <p className={`${styles.price} mt-1 mb-1 text text_type_digits-default`}>
        {price}
        {price && <CurrencyIcon type={'primary'} />}
      </p>
      <p className={`text text_type_main-default`}>{name}</p>

      {isModalOpened && (
        <Modal
          onOverlayClick={closeAllModals}
          closeAllModals={closeAllModals}
        >
          <IngredientDetails closeModal={closeAllModals} />
        </Modal>
      )}
    </article>
  );
};

export default IngredientCard;
