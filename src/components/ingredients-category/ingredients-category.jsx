import React, { forwardRef, useEffect } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import itemsStyles from './ingredients-category.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';

const IngredientsCategory = forwardRef(({ title, id, type, onIngredientClick }, ref) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const items = useSelector((state) => state.ingredientsReducer.ingredients);

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
                  //onIngredientClick={onIngredientClick}
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
  id: PropTypes.string,
  type: PropTypes.string,
  onIngredientClick: PropTypes.func,
};

export default IngredientsCategory;
