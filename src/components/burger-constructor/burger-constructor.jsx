import React, { useState, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { Button, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../total-price/total-price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { INGREDIENTS, loadingSymbol } from '../../utils/const';
import {
  ADD_BUN_TO_CART,
  ADD_INGREDIENT_TO_CART,
  RESET_CONSTRUCTOR_INGREDIENTS,
} from '../../services/actions/burger-constructor';
import { obtainOrderNumber } from '../../services/actions/order-details';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import ConstructorCard from '../constructor-card/constructor-card';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { buns, ingredients } = useSelector((state) => state.constructorReducer);

  const totalSum = useMemo(() => {
    return ingredients.reduce((total, item) => total + item.price, buns ? buns.price * 2 : 0);
  }, [ingredients, buns]);

  const bunId = buns?._id;
  const ingredientsId = ingredients.map((ingredient) => ingredient._id);
  const userOrder = [bunId, ...ingredientsId, bunId];

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      if (ingredient.type === INGREDIENTS.BUN) {
        dispatch({ type: ADD_BUN_TO_CART, payload: ingredient });
      } else {
        dispatch({ type: ADD_INGREDIENT_TO_CART, payload: { ...ingredient, key: uuidv4() } });
      }
    },
  });

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
      <div
        className={`mt-25 mb-10 ${styles.container} ${isHover ? styles.container__hover : ''}`}
        ref={dropRef}
      >
        {!buns ? (
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={'Перетащите булку'}
            price={''}
            thumbnail={loadingSymbol}
            extraClass={`mr-4`}
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
          {ingredients.length === 0 && (
            <div
              className={`${isHover ? styles.container__hover : ''}`}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <DragIcon type={'primary'} />
              <ConstructorElement
                isLocked={false}
                text={`Перетащите начинку`}
                price={''}
                thumbnail={loadingSymbol}
                extraClass={`mr-4 ml-1`}
              />
            </div>
          )}
          {ingredients.map((ingredient, index) => {
            return (
              (ingredient.type === 'main' || ingredient.type === 'sauce') && (
                <ConstructorCard
                  ingredient={ingredient}
                  index={index}
                  key={ingredient.key}
                />
              )
            );
          })}
        </ul>
        {!buns ? (
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={`Перетащите булку`}
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
