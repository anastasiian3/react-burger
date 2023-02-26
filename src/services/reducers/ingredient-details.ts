import { CLOSE_IGREDIENT_MODAL, OPEN_IGREDIENT_MODAL } from '../actions/constants/ingredient-details';
import { TIngredientDetailsActions } from '../actions/ingredient-details';
import { IIngredient } from '../types/ingredient';

export type TModalState = {
  initialIngredient: IIngredient | null;
  isModalOpen: boolean;
};

const modalInitialState: TModalState = {
  initialIngredient: null,
  isModalOpen: false,
};

export const modalReducer = (state = modalInitialState, action: TIngredientDetailsActions): TModalState => {
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
