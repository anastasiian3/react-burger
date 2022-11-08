import {
  ADD_INGREDIENT_TO_CART,
  DELETE_ITEM,
  ADD_BUN_TO_CART,
  RESET_CONSTRUCTOR_INGREDIENTS,
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
      return {
        ...state,
        ingredients: [...state.ingredients].filter((ingredient) => ingredient.key !== action.key),
      };
    }
    case RESET_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        ingredients: [],
        buns: null,
      };
    }
    default: {
      return state;
    }
  }
};
