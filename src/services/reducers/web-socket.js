import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_ITEMS } from '../actions/web-socket';

const wsInitialState = {
  orders: [],
  wsConnected: false,
  error: undefined,
  total: null,
  totalToday: null,
};

export const wsReducer = (state = wsInitialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    }
    case WS_GET_ITEMS: {
      return {
        ...state,
        error: undefined,
        wsConnected: true,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        total: null,
        totalToday: null,
        orders: [],
      };
    }
    default: {
      return state;
    }
  }
};
