import React, { useState } from 'react';
import styles from './burger-constructor.module.css';
import { Button, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../total-price/total-price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = ({ ingredients }) => {
  const cratorBun = ingredients.find((bun) => bun._id === '60d3b41abdacab0026a733c6');
  //const fluorescBun = ingredients.find((bun) => bun._id === '60d3b41abdacab0026a733c7');

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
    <div className={`${styles.constructor}`}>
      <div className={`mt-25 mb-10 ${styles.container}`}>
        {cratorBun && (
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={`${cratorBun.name} (верх)`}
            price={cratorBun.price}
            thumbnail={cratorBun.image}
            extraClass={`mr-4`}
          />
        )}

        <ul className={`${styles.list}`}>
          {ingredients.map((ingredient) => {
            return (
              (ingredient.type === 'main' || ingredient.type === 'sauce') && (
                <li
                  key={ingredient._id}
                  className={styles.ingredient}
                >
                  <DragIcon type={'primary'} />
                  <ConstructorElement
                    isLocked={false}
                    text={ingredient.name}
                    thumbnail={ingredient.image}
                    price={ingredient.price}
                  />
                </li>
              )
            );
          })}
        </ul>
        {cratorBun && (
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={`${cratorBun.name} (низ)`}
            price={cratorBun.price}
            thumbnail={cratorBun.image}
            extraClass={`mr-4`}
          />
        )}
      </div>
      <div className={styles.total}>
        <TotalPrice total={'9093'} />
        <Button
          onClick={openModal}
          htmlType={'button'}
          type='primary'
          size='large'
        >
          Оформить заказ
        </Button>
      </div>

      {isModalOpened && (
        <Modal
          onOverlayClick={closeAllModals}
          closeAllModals={closeAllModals}
        >
          <OrderDetails closeModal={closeAllModals} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
