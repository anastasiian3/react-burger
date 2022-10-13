import React from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import itemsStyles from './ingredients-category.module.css';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../utils/prop-types';

const IngredientsCategory = ({ title, id, type, ingredients, onIngredientClick }) => {
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
                  onIngredientClick={onIngredientClick}
                  data={item}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  count={item.__v}
                />
              </li>
            )
          );
        })}
      </ul>
    </section>
  );
};

IngredientsCategory.propTypes = {
  data: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
  onIngredientClick: PropTypes.func,
};

export default IngredientsCategory;
