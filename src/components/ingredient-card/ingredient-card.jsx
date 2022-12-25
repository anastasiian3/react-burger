import React, { useState } from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes } from '../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_IGREDIENT_MODAL } from '../../services/actions/ingredient-details';
import { INGREDIENTS } from '../../utils/const';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { getConstructorIngredients } from '../../utils/selectors';

const IngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch();
  const { buns, ingredients } = useSelector(getConstructorIngredients);

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

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredients',
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [ingredientsModal, setIngredientsModal] = useState(null);

  const openIgredientModal = () => {
    setIngredientsModal(ingredient);
    dispatch({ type: OPEN_IGREDIENT_MODAL, payload: ingredient });
  };
  const location = useLocation();

  return (
    <article
      className={`${styles.card}`}
      ref={dragRef}
      style={{ opacity }}
    >
      <Link
        to={{
          pathname: `ingredients/${ingredient._id}`,
          state: { background: location },
        }}
        className={styles.link}
      >
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
          onClick={openIgredientModal}
        />
        <p className={`${styles.price} mt-1 mb-1 text text_type_digits-default`}>
          {ingredient.price}
          {ingredient.price && <CurrencyIcon type={'primary'} />}
        </p>
        <p className={`text text_type_main-default`}>{ingredient.name}</p>
      </Link>
    </article>
  );
};

IngredientCard.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
};

export default IngredientCard;
