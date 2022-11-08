import { makeOrder } from '../../utils/api';

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST';
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS';
export const ORDER_DETAILS_FAILED = 'ORDER_DETAILS_FAILED';

export function obtainOrderNumber(data) {
  return function (dispatch) {
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
        console.log(error);
        dispatch({
          type: ORDER_DETAILS_FAILED,
        });
      });
  };
}
