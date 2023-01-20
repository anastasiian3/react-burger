import { IIngredient } from '../types/ingredient';
import {
  ADD_BUN_TO_CART,
  ADD_INGREDIENT_TO_CART,
  DELETE_ITEM,
  MOVE_ITEM,
  RESET_CONSTRUCTOR_INGREDIENTS,
} from './constants/burger-constructor';

export interface IAddIngredientToCart {
  readonly type: typeof ADD_INGREDIENT_TO_CART;
  readonly payload: IIngredient;
  readonly uuid: string;
}

export interface IAddBunToCart {
  readonly type: typeof ADD_BUN_TO_CART;
  readonly payload: IIngredient;
}

export interface IResetConstructorIngredients {
  readonly type: typeof RESET_CONSTRUCTOR_INGREDIENTS;
}

export interface IDeleteConstructorItem {
  readonly type: typeof DELETE_ITEM;
  readonly payload: number;
}

export interface IMoveConstructorItem {
  readonly type: typeof MOVE_ITEM;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export type TConstructorActions =
  | IAddIngredientToCart
  | IAddBunToCart
  | IResetConstructorIngredients
  | IDeleteConstructorItem
  | IMoveConstructorItem;
