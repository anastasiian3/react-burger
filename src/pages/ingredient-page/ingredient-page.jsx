import React from 'react';
import styles from './ingredient-page.module.css';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const IngredientPage = () => {
  return (
    <section className={styles.container}>
      <IngredientDetails />
    </section>
  );
};

export default IngredientPage;
