import { TIngredientsActions } from '../actions/burger-ingredients';
import {
  GET_INGREDIENTS_FAIL,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../actions/constants/burger-ingredients';
import { IIngredient } from '../types/ingredient';

export type TIngredientsState = {
  ingredients: IIngredient[];
  ingredientsRequest: boolean;
  ingredientsError: boolean;
};

const ingredientsInitialState: TIngredientsState = {
  ingredients: [],

  ingredientsRequest: false,
  ingredientsError: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsError: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAIL: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsError: true,
      };
    }
    default: {
      return state;
    }
  }
};
