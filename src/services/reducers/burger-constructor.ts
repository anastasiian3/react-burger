import { TConstructorActions } from '../actions/burger-constructor';
import {
  ADD_BUN_TO_CART,
  ADD_INGREDIENT_TO_CART,
  DELETE_ITEM,
  MOVE_ITEM,
  RESET_CONSTRUCTOR_INGREDIENTS,
} from '../actions/constants/burger-constructor';
import { IIngredient } from '../types/ingredient';

export type TConstructorState = {
  ingredients: ReadonlyArray<IIngredient>;
  buns: IIngredient | null;
  uuid: string | null;
};

const initialConstructorState: TConstructorState = {
  ingredients: [],
  buns: null,
  uuid: null,
};

export const constructorReducer = (state = initialConstructorState, action: TConstructorActions): TConstructorState => {
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
