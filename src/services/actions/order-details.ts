import { makeOrder } from '../../utils/api';
import { AppDispatch } from '../types';
import { ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from './constants/order-details';

export interface IOrderDetailsRequest {
  readonly type: typeof ORDER_DETAILS_REQUEST;
}

export interface IOrderDetailsSuccess {
  readonly type: typeof ORDER_DETAILS_SUCCESS;
  readonly order: number;
  readonly orderName: string;
}

export interface IOrderDetailsFailure {
  readonly type: typeof ORDER_DETAILS_FAILED;
}

export type TOrderDetailsActions = IOrderDetailsRequest | IOrderDetailsSuccess | IOrderDetailsFailure;

export function obtainOrderNumber(data: Array<string>) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    makeOrder(data)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ORDER_DETAILS_SUCCESS,
            order: res.order.number,
            orderName: res.name,
          });
        } else {
          dispatch({
            type: ORDER_DETAILS_FAILED,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: ORDER_DETAILS_FAILED,
        });
      });
  };
}
