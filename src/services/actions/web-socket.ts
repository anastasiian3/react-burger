import { TWsItem } from '../reducers/web-socket';
import { AppDispatch } from '../types';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ITEMS,
  WS_SEND_MESSAGE,
  WS_USER_NAME_UPDATE,
} from './constants/web-socket';

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly error: string;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetItems {
  readonly type: typeof WS_GET_ITEMS;
  readonly payload: TWsItem;
}
export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
}
export interface IWsUserNameUpdate {
  readonly type: typeof WS_USER_NAME_UPDATE;
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetItems
  | IWsUserNameUpdate;

export const startConnectionWebSocket = (url: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: WS_CONNECTION_START,
    payload: url,
  });
};

export const closeConnectionWebSocket = () => () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};
