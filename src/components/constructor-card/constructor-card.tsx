import React, { useRef, FC } from 'react';
import styles from './constructor-card.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from 'react-dnd';
import { DELETE_ITEM, MOVE_ITEM } from '../../services/actions/constants/burger-constructor';
import { IIngredient } from '../../services/types/ingredient';
import { useOwnDispatch as useDispatch } from '../../services/types';

interface IConstructorCard {
  ingredient: IIngredient;
  index: number;
}

interface IDragItem {
  index: number;
}

const ConstructorCard: FC<IConstructorCard> = ({ ingredient, index }) => {
  const dispatch = useDispatch();

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: MOVE_ITEM,
      dragIndex,
      hoverIndex,
    });
  };

  const handleItemDelete = () => {
    dispatch({ type: DELETE_ITEM, payload: index });
  };

  const ref = useRef<HTMLLIElement>(null);
  const id = ingredient._id;

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor-card',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  const [, drop] = useDrop({
    accept: 'constructor-card',
    hover(item: IDragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li
      key={ingredient.uuid}
      className={styles.ingredient}
      style={{ opacity }}
      ref={ref}
    >
      <DragIcon type={'primary'} />
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={handleItemDelete}
        extraClass={`mr-4 ml-1`}
      />
    </li>
  );
};

export default ConstructorCard;
