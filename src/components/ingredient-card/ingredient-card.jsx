import React from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../utils/prop-types';

const IngredientCard = ({ data, name, image, price, count, onIngredientClick }) => {
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
        onClick={() => {
          onIngredientClick(data);
        }}
      />
      <p className={`${styles.price} mt-1 mb-1 text text_type_digits-default`}>
        {price}
        {price && <CurrencyIcon type={'primary'} />}
      </p>
      <p className={`text text_type_main-default`}>{name}</p>
    </article>
  );
};

IngredientCard.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
  onIngredientClick: PropTypes.func.isRequired,
};

export default IngredientCard;
