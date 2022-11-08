import React, { useRef } from 'react';
import styles from './constructor-card.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { DELETE_ITEM, MOVE_ITEM } from '../../services/actions/burger-constructor';
import { useDrop, useDrag } from 'react-dnd';

const ConstructorCard = ({ ingredient, index }) => {
  const dispatch = useDispatch();

  const moveCard = (dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_ITEM,
      dragIndex,
      hoverIndex,
    });
  };

  const handleItemDelete = (key) => {
    dispatch({ type: DELETE_ITEM, key: key });
  };

  const ref = useRef(null);
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

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructor-card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
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

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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
      data-handler-id={handlerId}
    >
      <DragIcon type={'primary'} />
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={() => {
          handleItemDelete(ingredient.key);
        }}
        extraClass={`mr-4 ml-1`}
      />
    </li>
  );
};

export default ConstructorCard;
