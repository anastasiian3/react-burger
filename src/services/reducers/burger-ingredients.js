import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAIL } from '../actions/burger-ingredients';

const ingredientsInitialState = {
  ingredients: [],

  ingredientsRequest: false,
  ingredientsError: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
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
