import { OPEN_IGREDIENT_MODAL, CLOSE_IGREDIENT_MODAL } from '../actions/ingredient-details';

const modalInitialState = {
  initialIngredient: null,
  isModalOpen: false,
};

export const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
    case OPEN_IGREDIENT_MODAL: {
      return {
        ...state,
        isModalOpen: true,
        initialIngredient: action.payload,
      };
    }
    case CLOSE_IGREDIENT_MODAL: {
      return {
        ...state,
        isModalOpen: false,
        initialIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
