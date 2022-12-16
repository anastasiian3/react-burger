import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const IngredientDetails = () => {
  const { id } = useParams();

  const { ingredients } = useSelector((state) => state.ingredientsReducer);

  const ingredient = ingredients.find((item) => item._id === id);

  return (
    ingredient && (
      <section className={`pr-10 pb-15 pl-10 ${styles.popup}`}>
        <h2 className={`text text_type_main-large ${styles.heading}`}>Детали ингредиента</h2>
        <div className={styles.info}>
          <img
            className={`mb-4`}
            src={ingredient.image_large}
            alt={ingredient.name}
          />
          <p className={`text text_type_main-medium mb-8`}>{ingredient.name}</p>

          <div className={`text text_type_main-default text_color_inactive ${styles.container}`}>
            <p className={styles.title}>Калории,ккал</p>
            <span className={`text text_type_digits-default ${styles.calories}`}>{ingredient.calories}</span>
            <p className={styles.title}>Белки, г</p>
            <span className={`text text_type_digits-default ${styles.proteins}`}>{ingredient.proteins}</span>
            <p className={styles.title}>Жиры, г</p>
            <span className={`text text_type_digits-default ${styles.fat}`}>{ingredient.fat}</span>
            <p className={styles.title}>Углеводы, г</p>
            <span className={`text text_type_digits-default ${styles.carbohydrates}`}>{ingredient.carbohydrates}</span>
          </div>
        </div>
      </section>
    )
  );
};

export default IngredientDetails;
