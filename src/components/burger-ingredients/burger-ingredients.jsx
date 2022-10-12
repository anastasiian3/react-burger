import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = React.useState('bun');
  console.log(ingredients);

  const clickOnIngredientType = (id) => {
    setCurrent(id);
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
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
        />
        <IngredientsCategory
          id={'sauce'}
          title={'Соусы'}
          type={'sauce'}
          ingredients={ingredients}
        />
        <IngredientsCategory
          id={'main'}
          title={'Начинки'}
          type={'main'}
          ingredients={ingredients}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
