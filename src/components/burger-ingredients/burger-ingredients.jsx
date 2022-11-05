import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../utils/prop-types';
import { INGREDIENTS } from '../../utils/const';

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
          value={INGREDIENTS.BUN}
          active={current === INGREDIENTS.BUN}
          onClick={clickOnIngredientType}
        >
          Булки
        </Tab>
        <Tab
          value={INGREDIENTS.SAUCE}
          active={current === INGREDIENTS.SAUCE}
          onClick={clickOnIngredientType}
        >
          Соусы
        </Tab>
        <Tab
          value={INGREDIENTS.MAIN}
          active={current === INGREDIENTS.MAIN}
          onClick={clickOnIngredientType}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.container}>
        <IngredientsCategory
          id={INGREDIENTS.BUN}
          title={'Булки'}
          type={INGREDIENTS.BUN}
          ingredients={ingredients}
          onIngredientClick={setIngredientsModal}
        />
        <IngredientsCategory
          id={INGREDIENTS.SAUCE}
          title={'Соусы'}
          type={INGREDIENTS.SAUCE}
          ingredients={ingredients}
          onIngredientClick={setIngredientsModal}
        />
        <IngredientsCategory
          id={INGREDIENTS.MAIN}
          title={'Начинки'}
          type={INGREDIENTS.MAIN}
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
