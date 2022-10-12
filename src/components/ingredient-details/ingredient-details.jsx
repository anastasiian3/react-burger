import styles from './ingredient-details.module.css';
import data from '../../utils/data';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientDetails = ({ ingredients, closeModal }) => {
  return (
    <section className={`pr-10 pb-15 pl-10 ${styles.popup}`}>
      <button
        className={styles.close_btn}
        onClick={closeModal}
      >
        <CloseIcon type={'primary'} />
      </button>
      <h2 className={`text text_type_main-large ${styles.heading}`}>Детали ингредиента</h2>
      <div className={styles.info}>
        <img
          className={`mb-4`}
          src={data[2].image_large}
          alt={data[2].name}
        />
        <p className={`text text_type_main-medium mb-8`}>{data[2].name}</p>

        <div className={`text text_type_main-default text_color_inactive ${styles.container}`}>
          <p className={styles.title}>Калории,ккал</p>
          <span className={`text text_type_digits-default ${styles.calories}`}>{data[2].calories}</span>
          <p className={styles.title}>Белки, г</p>
          <span className={`text text_type_digits-default ${styles.proteins}`}>{data[2].proteins}</span>
          <p className={styles.title}>Жиры, г</p>
          <span className={`text text_type_digits-default ${styles.fat}`}>{data[2].fat}</span>
          <p className={styles.title}>Углеводы, г</p>
          <span className={`text text_type_digits-default ${styles.carbohydrates}`}>{data[2].carbohydrates}</span>
        </div>
      </div>
    </section>
  );
};

export default IngredientDetails;
