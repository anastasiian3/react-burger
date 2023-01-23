import React, { forwardRef, ForwardedRef, FC } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import itemsStyles from './ingredients-category.module.css';
import { useSelector } from 'react-redux';
import { getAllIngredients } from '../../utils/selectors';

interface IIngredientsCategory {
  title: string;
  id: string;
  type: string;
  ref?: ForwardedRef<HTMLUListElement>;
}

const IngredientsCategory: FC<IIngredientsCategory> = forwardRef(({ title, id, type }, ref) => {
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
                <IngredientCard ingredient={item} />
              </li>
            )
          );
        })}
      </ul>
    </section>
  );
});

export default IngredientsCategory;
