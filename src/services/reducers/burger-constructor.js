import {
  ADD_INGREDIENT_TO_CART,
  DELETE_ITEM,
  ADD_BUN_TO_CART,
  RESET_CONSTRUCTOR_INGREDIENTS,
  MOVE_ITEM,
} from '../actions/burger-constructor';

const initialConstructorState = {
  ingredients: [],
  buns: null,
};

export const constructorReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
    case ADD_BUN_TO_CART: {
      return {
        ...state,
        buns: { ...action.payload },
      };
    }
    case ADD_INGREDIENT_TO_CART: {
      return {
        ...state,
        ingredients: state.ingredients.concat(action.payload),
        uuid: action.uuid,
      };
    }
    case DELETE_ITEM: {
      const updatedIngredients = [...state.ingredients];
      updatedIngredients.splice(action.payload, 1);
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    }
    case RESET_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        ingredients: [],
        buns: null,
      };
    }
    case MOVE_ITEM: {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.hoverIndex, 0, ingredients.splice(action.dragIndex, 1)[0]);
      return {
        ...state,
        ingredients: ingredients,
      };
    }
    default: {
      return state;
    }
  }
};
