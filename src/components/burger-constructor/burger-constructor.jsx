import React, { useState, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { Button, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../total-price/total-price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { loadingSymbol } from '../../utils/const';
import { DELETE_ITEM, RESET_CONSTRUCTOR_INGREDIENTS } from '../../services/actions/burger-constructor';
import { obtainOrderNumber } from '../../services/actions/order-details';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const handleItemDelete = (key) => {
    dispatch({ type: DELETE_ITEM, key: key });
  };

  const { buns, ingredients } = useSelector((state) => state.constructorReducer);

  const totalSum = useMemo(() => {
    return ingredients.reduce((total, item) => total + item.price, buns ? buns.price * 2 : 0);
  }, [ingredients, buns]);

  const bunId = buns?._id;
  const ingredientsId = ingredients.map((ingredient) => ingredient._id);
  const userOrder = [bunId, ...ingredientsId, bunId];

  const [isModalOpened, setIsModalOpened] = useState(false);
  //закрытие всех модальных окон
  const closeAllModals = () => {
    setIsModalOpened(false);
    dispatch({ type: RESET_CONSTRUCTOR_INGREDIENTS });
  };
  //открытие всех модальных окон
  const openOrderModal = () => {
    dispatch(obtainOrderNumber(userOrder));
    setIsModalOpened(true);
  };

  return (
    <div className={`${styles.constructor}`}>
      <div className={`mt-25 mb-10 ${styles.container}`}>
        {!buns ? (
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={'Выберите булку'}
            price={''}
            thumbnail={loadingSymbol}
            extraClass={`mr-4 `}
          />
        ) : (
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={`${buns.name} (верх)`}
            price={buns.price}
            thumbnail={buns.image}
            extraClass={`mr-4`}
          />
        )}

        <ul className={`${styles.list}`}>
          {ingredients.map((ingredient) => {
            return (
              (ingredient.type === 'main' || ingredient.type === 'sauce') && (
                <li
                  key={ingredient.uuid}
                  className={styles.ingredient}
                >
                  <DragIcon type={'primary'} />
                  <ConstructorElement
                    isLocked={false}
                    text={ingredient.name}
                    thumbnail={ingredient.image}
                    price={ingredient.price}
                    handleClose={() => {
                      handleItemDelete(ingredient.key);
                    }}
                  />
                </li>
              )
            );
          })}
        </ul>
        {!buns ? (
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={`Выберите булку`}
            price={''}
            thumbnail={loadingSymbol}
            extraClass={`mr-4`}
          />
        ) : (
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={`${buns.name} (низ)`}
            price={buns.price}
            thumbnail={buns.image}
            extraClass={`mr-4`}
          />
        )}
      </div>
      <div className={styles.total}>
        <TotalPrice total={totalSum} />
        {ingredients.length === 0 || !buns ? (
          <Button
            onClick={openOrderModal}
            htmlType={'button'}
            type='primary'
            size='large'
            disabled={true}
          >
            Оформить заказ
          </Button>
        ) : (
          <Button
            onClick={openOrderModal}
            htmlType={'button'}
            type='primary'
            size='large'
          >
            Оформить заказ
          </Button>
        )}
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
