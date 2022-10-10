import React from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import itemsStyles from './ingredients-items.module.css';

const IngredientsItems = ({ title, id, type, ingredients }) => {
  return (
    <section>
      <h3
        className={`text text_type_main-medium pb-6`}
        id={id}
      >
        {title}
      </h3>
      <ul className={`${itemsStyles.list}`}>
        {ingredients.map((item) => {
          return (
            item.type === type && (
              <li key={item._id}>
                <IngredientCard
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  count={'1'}
                  //   count={item.__v}
                />
              </li>
            )
          );
        })}
      </ul>
    </section>
  );
};

export default IngredientsItems;
