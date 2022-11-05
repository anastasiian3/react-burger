import React from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../utils/prop-types';

const IngredientCard = ({ ingredient, count, onIngredientClick }) => {
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
        onClick={() => {
          onIngredientClick(ingredient);
        }}
      />
      <p className={`${styles.price} mt-1 mb-1 text text_type_digits-default`}>
        {ingredient.price}
        {ingredient.price && <CurrencyIcon type={'primary'} />}
      </p>
      <p className={`text text_type_main-default`}>{ingredient.name}</p>
    </article>
  );
};

IngredientCard.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
  count: PropTypes.number,
  onIngredientClick: PropTypes.func.isRequired,
};

export default IngredientCard;
