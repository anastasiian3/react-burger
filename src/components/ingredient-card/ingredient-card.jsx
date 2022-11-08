import React, { useState } from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_IGREDIENT_MODAL } from '../../services/actions/ingredient-details';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ADD_BUN_TO_CART, ADD_INGREDIENT_TO_CART } from '../../services/actions/burger-constructor';
import { v4 as uuidv4 } from 'uuid';
import { INGREDIENTS } from '../../utils/const';

const IngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch();
  const { buns, ingredients } = useSelector((state) => state.constructorReducer);

  let count = 0;

  if (ingredient.type === INGREDIENTS.BUN) {
    if (buns !== null && buns._id === ingredient._id) {
      count = 2;
    }
  } else {
    ingredients.forEach((ingr) => {
      if (ingr._id === ingredient._id) {
        count += 1;
      }
    });
  }

  const [ingredientsModal, setIngredientsModal] = useState(null);
  //закрытие всех модальных окон
  const closeAllModals = () => {
    setIngredientsModal(null);
    dispatch({ type: CLOSE_IGREDIENT_MODAL });
  };

  //  const openIgredientModal = () => {
  //   setIngredientsModal(ingredient);
  //   dispatch({ type: OPEN_IGREDIENT_MODAL, payload: ingredient });
  // };

  const addCard = () => {
    if (ingredient.type === INGREDIENTS.BUN) {
      dispatch({ type: ADD_BUN_TO_CART, payload: ingredient });
    } else {
      dispatch({ type: ADD_INGREDIENT_TO_CART, payload: { ...ingredient, key: uuidv4() } });
    }
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
        src={ingredient.image}
        alt={ingredient.name}
        onClick={addCard}
      />
      <p className={`${styles.price} mt-1 mb-1 text text_type_digits-default`}>
        {ingredient.price}
        {ingredient.price && <CurrencyIcon type={'primary'} />}
      </p>
      <p className={`text text_type_main-default`}>{ingredient.name}</p>

      {ingredientsModal && (
        <Modal
          onOverlayClick={closeAllModals}
          closeAllModals={closeAllModals}
        >
          <IngredientDetails />
        </Modal>
      )}
    </article>
  );
};

IngredientCard.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
  count: PropTypes.number,
};

export default IngredientCard;
