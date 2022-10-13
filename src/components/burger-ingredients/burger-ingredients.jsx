import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../utils/prop-types';

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState('bun');

  const clickOnIngredientType = (id) => {
    setCurrent(id);
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  const [ingredientsModal, setIngredientsModal] = useState(null);
  //закрытие всех модальных окон
  const closeAllModals = () => {
    setIngredientsModal(null);
  };

  return (
    <section className={styles.ingredients}>
      <h1 className={`${styles.heading} text text_type_main-large mb-5 pt-10`}>Соберите бургер</h1>
      <div
        style={{ display: 'flex' }}
        className='pb-10'
      >
        <Tab
          value='bun'
          active={current === 'bun'}
          onClick={clickOnIngredientType}
        >
          Булки
        </Tab>
        <Tab
          value='sauce'
          active={current === 'sauce'}
          onClick={clickOnIngredientType}
        >
          Соусы
        </Tab>
        <Tab
          value='main'
          active={current === 'main'}
          onClick={clickOnIngredientType}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.container}>
        <IngredientsCategory
          id={'bun'}
          title={'Булки'}
          type={'bun'}
          ingredients={ingredients}
          onIngredientClick={setIngredientsModal}
        />
        <IngredientsCategory
          id={'sauce'}
          title={'Соусы'}
          type={'sauce'}
          ingredients={ingredients}
          onIngredientClick={setIngredientsModal}
        />
        <IngredientsCategory
          id={'main'}
          title={'Начинки'}
          type={'main'}
          ingredients={ingredients}
          onIngredientClick={setIngredientsModal}
        />
      </div>
      {ingredientsModal && (
        <Modal
          onOverlayClick={closeAllModals}
          closeAllModals={closeAllModals}
        >
          <IngredientDetails ingredients={ingredientsModal} />
        </Modal>
      )}
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
