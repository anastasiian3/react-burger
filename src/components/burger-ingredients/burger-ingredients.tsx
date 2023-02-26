import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useInView } from 'react-intersection-observer';
import { Ingredient } from '../../utils/const';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState<string>(Ingredient.Bun);

  const options = {
    threshold: 0,
  };

  const [bunRef, inViewBun] = useInView(options);
  const [mainRef, inViewMain] = useInView(options);
  const [sauceRef, inViewSauce] = useInView(options);

  React.useEffect(() => {
    if (inViewBun) {
      setCurrent(Ingredient.Bun);
    } else if (inViewSauce) {
      setCurrent(Ingredient.Sauce);
    } else if (inViewMain) {
      setCurrent(Ingredient.Main);
    }
  }, [inViewBun, inViewMain, inViewSauce]);

  const clickOnIngredientType = (id: string) => {
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
          value={Ingredient.Bun}
          active={current === Ingredient.Bun}
          onClick={clickOnIngredientType}
        >
          Булки
        </Tab>
        <Tab
          value={Ingredient.Sauce}
          active={current === Ingredient.Sauce}
          onClick={clickOnIngredientType}
        >
          Соусы
        </Tab>
        <Tab
          value={Ingredient.Main}
          active={current === Ingredient.Main}
          onClick={clickOnIngredientType}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.container}>
        <IngredientsCategory
          id={Ingredient.Bun}
          title={'Булки'}
          type={Ingredient.Bun}
          ref={bunRef}
        />
        <IngredientsCategory
          id={Ingredient.Sauce}
          title={'Соусы'}
          type={Ingredient.Sauce}
          ref={sauceRef}
        />
        <IngredientsCategory
          id={Ingredient.Main}
          title={'Начинки'}
          type={Ingredient.Main}
          ref={mainRef}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
