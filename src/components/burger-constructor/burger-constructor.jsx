import React from 'react';
import styles from './burger-constructor.module.css';
import { Button, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../total-price/total-price';

const BurgerConstructor = ({ ingredients }) => {
  console.log(ingredients);

  const cratorBun = ingredients.find((bun) => bun._id === '60d3b41abdacab0026a733c6');
  //const fluorescBun = ingredients.find((bun) => bun._id === '60d3b41abdacab0026a733c7');
  console.log(cratorBun);

  return (
    <div className={`${styles.constructor}`}>
      <div className={`mt-25 mb-10 ${styles.container}`}>
        {cratorBun && (
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={`${cratorBun.name} (верх)`}
            price={cratorBun.price}
            thumbnail={cratorBun.image}
          />
        )}

        <ul className={`${styles.list}`}>
          {ingredients.map((ingredient) => {
            return (
              (ingredient.type === 'main' || ingredient.type === 'sauce') && (
                <li
                  key={ingredient._id}
                  className={styles.ingredient}
                >
                  <DragIcon type={'primary'} />
                  <ConstructorElement
                    isLocked={false}
                    text={ingredient.name}
                    thumbnail={ingredient.image}
                    price={ingredient.price}
                  />
                </li>
              )
            );
          })}
        </ul>
        {cratorBun && (
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={`${cratorBun.name} (низ)`}
            price={cratorBun.price}
            thumbnail={cratorBun.image}
          />
        )}
      </div>
      <div className={styles.total}>
        <TotalPrice total={'9093'} />
        <Button
          htmlType={'button'}
          type='primary'
          size='large'
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
