import { getServerData } from '../../utils/api';
import { AppDispatch, AppThunk } from '../types';
import { IIngredient } from '../types/ingredient';
import { GET_INGREDIENTS_FAIL, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from './constants/burger-ingredients';

export interface IGetIngredientRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<IIngredient>;
}

export interface IGetIngredientFail {
  readonly type: typeof GET_INGREDIENTS_FAIL;
}

export type TIngredientsActions = IGetIngredientRequest | IGetIngredientSuccess | IGetIngredientFail;

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  getServerData()
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAIL,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: GET_INGREDIENTS_FAIL,
      });
    });
};
