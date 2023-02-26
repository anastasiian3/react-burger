import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ITEMS,
} from '../actions/constants/web-socket';
import { TWsActions } from '../actions/web-socket';

export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type TWsItem = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TWsOrdersState = {
  data: TWsItem;
  wsConnected: boolean;
  error: string | undefined;
};

const wsInitialState: TWsOrdersState = {
  data: { success: false, orders: [], total: 0, totalToday: 0 },
  wsConnected: false,
  error: undefined,
};

export const wsReducer = (state = wsInitialState, action: TWsActions): TWsOrdersState => {
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
        error: action.error,
        wsConnected: false,
      };
    }
    case WS_GET_ITEMS: {
      return {
        ...state,
        error: undefined,
        wsConnected: true,
        data: {
          ...state.data,
          success: true,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        },
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        data: {
          ...state.data,
          success: false,
          orders: [],
          total: 0,
          totalToday: 0,
        },
      };
    }
    default: {
      return state;
    }
  }
};
