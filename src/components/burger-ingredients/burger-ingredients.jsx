import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useInView } from 'react-intersection-observer';
import { INGREDIENTS } from '../../utils/const';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState(INGREDIENTS.BUN);

  const options = {
    threshold: 0,
  };

  const [bunRef, inViewBun] = useInView(options);
  const [mainRef, inViewMain] = useInView(options);
  const [sauceRef, inViewSauce] = useInView(options);

  React.useEffect(() => {
    if (inViewBun) {
      setCurrent(INGREDIENTS.BUN);
    } else if (inViewSauce) {
      setCurrent(INGREDIENTS.SAUCE);
    } else if (inViewMain) {
      setCurrent(INGREDIENTS.MAIN);
    }
  }, [inViewBun, inViewMain, inViewSauce]);

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
          ref={bunRef}
        />
        <IngredientsCategory
          id={INGREDIENTS.SAUCE}
          title={'Соусы'}
          type={INGREDIENTS.SAUCE}
          ref={sauceRef}
        />
        <IngredientsCategory
          id={INGREDIENTS.MAIN}
          title={'Начинки'}
          type={INGREDIENTS.MAIN}
          ref={mainRef}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
