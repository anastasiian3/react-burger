import { IIngredient } from '../types/ingredient';
import { CLOSE_IGREDIENT_MODAL, OPEN_IGREDIENT_MODAL } from './constants/ingredient-details';

export interface IOpenIngredientDetails {
  readonly type: typeof OPEN_IGREDIENT_MODAL;
  readonly payload: IIngredient;
}

export interface ICloseIngredientDetails {
  readonly type: typeof CLOSE_IGREDIENT_MODAL;
}

export type TIngredientDetailsActions = IOpenIngredientDetails | ICloseIngredientDetails;
