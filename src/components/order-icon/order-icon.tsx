import React from 'react';
import styles from './order-icon.module.css';
import { IIngredient } from '../../services/types/ingredient';

const OrderIcon = ({ ingredients }: { ingredients: IIngredient[] }) => {
  return (
    <ul className={styles.list}>
      {ingredients?.slice(0, 6).map((item, index) => {
        if (index < 5) {
          return (
            <li
              key={index}
              className={styles.item}
            >
              <img
                src={item.image_mobile}
                alt={item.name}
                className={styles.icon}
              />
            </li>
          );
        } else {
          return (
            <li
              key={index}
              className={styles.item}
            >
              <img
                src={item.image_mobile}
                alt={item.name}
                className={styles.icon_last}
              />
              {ingredients.length > 6 && (
                <span className={`text text_type_digits-default ${styles.overlay_text}`}>
                  {`+${ingredients.length - 5}`}
                </span>
              )}
            </li>
          );
        }
      })}
    </ul>
  );
};

export default OrderIcon;
