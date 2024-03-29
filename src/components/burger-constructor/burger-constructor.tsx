import React, { useState, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { Button, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../total-price/total-price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { Ingredient, loadingSymbol } from '../../utils/const';
import { obtainOrderNumber } from '../../services/actions/order-details';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import ConstructorCard from '../constructor-card/constructor-card';
import { getCookie } from '../../utils/cookies';
import { Link, useHistory } from 'react-router-dom';
import { getConstructorIngredients } from '../../utils/selectors';
import {
  ADD_BUN_TO_CART,
  ADD_INGREDIENT_TO_CART,
  RESET_CONSTRUCTOR_INGREDIENTS,
} from '../../services/actions/constants/burger-constructor';
import { IIngredient } from '../../services/types/ingredient';
import { useOwnDispatch as useDispatch, useOwnSelector as useSelector } from '../../services/types';

const BurgerConstructor = () => {
  const cookie = getCookie('accessToken');
  const history = useHistory();

  const dispatch = useDispatch();

  const { buns, ingredients } = useSelector(getConstructorIngredients);

  const totalSum = useMemo(() => {
    return ingredients.reduce((total, item) => total + item.price, buns ? buns.price * 2 : 0);
  }, [ingredients, buns]);

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredients',
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient: IIngredient) {
      if (ingredient.type === Ingredient.Bun) {
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
  //открытие модальных окон
  const openOrderModal = () => {
    if (!cookie) {
      history.replace('/login');
    } else {
      const bunId = buns?._id;
      const ingredientsId = ingredients.map((ingredient) => ingredient._id);
      const userOrder = [bunId!, ...ingredientsId, bunId!];
      dispatch(obtainOrderNumber(userOrder));
      setIsModalOpened(true);
    }
  };

  const sendOrder = () => {
    if (!cookie) {
      history.replace('/login');
    } else {
      openOrderModal();
    }
  };

  return (
    <div className={`${styles.constructor}`}>
      <div
        className={`mt-25 mb-10 ${styles.container} ${isHover ? styles.container__hover : ''}`}
        ref={dropRef}
      >
        {!buns ? (
          <ConstructorElement
            price={0}
            type={'top'}
            isLocked={true}
            text={'Перетащите булку'}
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
            <div className={`${isHover ? styles.container__hover : ''} ${styles.container_type_empty}`}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                price={0}
                isLocked={false}
                text={`Перетащите начинку`}
                thumbnail={loadingSymbol}
                extraClass={`mr-3 ml-1`}
              />
            </div>
          )}
          {ingredients.map((ingredient, index) => {
            return (
              (ingredient.type === Ingredient.Main || ingredient.type === Ingredient.Sauce) && (
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
            price={0}
            text={`Перетащите булку`}
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
        {cookie ? (
          <Button
            onClick={sendOrder}
            htmlType={'button'}
            type='primary'
            size='large'
            disabled={ingredients.length === 0 || !buns ? true : false}
          >
            Оформить заказ
          </Button>
        ) : (
          <Link to={'/login'}>
            <Button
              htmlType={'button'}
              type='primary'
              size='large'
            >
              Войти
            </Button>
          </Link>
        )}
      </div>

      {isModalOpened && (
        <Modal
          onOverlayClick={closeAllModals}
          closeAllModals={closeAllModals}
        >
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
