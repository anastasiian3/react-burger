import React from 'react';
import styles from './total-price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const TotalPrice = ({ total }) => {
  return (
    <div className={`${styles.price}`}>
      <span className='text text_type_digits-medium'>{total}</span>
      <CurrencyIcon type={'primary'} />
    </div>
  );
};

TotalPrice.propTypes = {
  total: PropTypes.number.isRequired,
};

export default TotalPrice;
