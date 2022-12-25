import React, { forwardRef } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import itemsStyles from './ingredients-category.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getAllIngredients } from '../../utils/selectors';

const IngredientsCategory = forwardRef(({ title, id, type }, ref) => {
  const items = useSelector(getAllIngredients);

  return (
    <section>
      <h3
        className={`text text_type_main-medium pb-6`}
        id={id}
      >
        {title}
      </h3>
      <ul
        className={`${itemsStyles.list}`}
        ref={ref}
      >
        {items?.map((item) => {
          return (
            item.type === type && (
              <li key={item._id}>
                <IngredientCard
                  ingredient={item}
                  count={item.__v}
                />
              </li>
            )
          );
        })}
      </ul>
    </section>
  );
});

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientsCategory;
