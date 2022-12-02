import { ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILED } from '../actions/order-details';

const orderInitialState = {
  order: null,
  orderName: null,
  orderDetailsRequest: false,
  showOrderDetails: false,
};

export const orderReducer = (state = orderInitialState, action) => {
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
