import { ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from '../actions/constants/order-details';
import { TOrderDetailsActions } from '../actions/order-details';

export type TOrderState = {
  order: number | null;
  orderName: string | null;
  orderDetailsRequest: boolean;
  showOrderDetails: boolean;
};

const orderInitialState: TOrderState = {
  order: null,
  orderName: null,
  orderDetailsRequest: false,
  showOrderDetails: false,
};

export const orderReducer = (state = orderInitialState, action: TOrderDetailsActions): TOrderState => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        order: null,
        orderName: null,
        orderDetailsRequest: true,
        showOrderDetails: false,
      };
    }
    case ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderName: action.orderName,
        showOrderDetails: true,
        orderDetailsRequest: false,
      };
    }
    case ORDER_DETAILS_FAILED: {
      return {
        ...state,
        order: null,
        orderName: null,
        orderDetailsRequest: false,
        showOrderDetails: false,
      };
    }
    default: {
      return state;
    }
  }
};
