import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../utils/prop-types';

const IngredientDetails = ({ ingredients }) => {
  console.log(ingredients);
  return (
    <section className={`pr-10 pb-15 pl-10 ${styles.popup}`}>
      <h2 className={`text text_type_main-large ${styles.heading}`}>Детали ингредиента</h2>
      <div className={styles.info}>
        <img
          className={`mb-4`}
          src={ingredients.image_large}
          alt={ingredients.name}
        />
        <p className={`text text_type_main-medium mb-8`}>{ingredients.name}</p>

        <div className={`text text_type_main-default text_color_inactive ${styles.container}`}>
          <p className={styles.title}>Калории,ккал</p>
          <span className={`text text_type_digits-default ${styles.calories}`}>{ingredients.calories}</span>
          <p className={styles.title}>Белки, г</p>
          <span className={`text text_type_digits-default ${styles.proteins}`}>{ingredients.proteins}</span>
          <p className={styles.title}>Жиры, г</p>
          <span className={`text text_type_digits-default ${styles.fat}`}>{ingredients.fat}</span>
          <p className={styles.title}>Углеводы, г</p>
          <span className={`text text_type_digits-default ${styles.carbohydrates}`}>{ingredients.carbohydrates}</span>
        </div>
      </div>
    </section>
  );
};

IngredientDetails.propTypes = {
  ingredients: ingredientsPropTypes.isRequired,
};

export default IngredientDetails;
