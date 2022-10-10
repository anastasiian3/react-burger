import React from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = ({ name, image, price, count }) => {
  return (
    <article className={`${styles.card}`}>
      {/* {count && (
        <Counter
          count={count}
          size='default'
          className={`text text_type_digits-default`}
        />
      )} */}

      {count && (
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
      />
      <p className={`${styles.price} mt-1 mb-1 text text_type_digits-default`}>
        {price}
        {price && <CurrencyIcon type={'primary'} />}
      </p>
      <p className={`text text_type_main-default`}>{name}</p>
    </article>
  );
};

export default IngredientCard;
