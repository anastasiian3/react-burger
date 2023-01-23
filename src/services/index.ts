import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ITEMS,
  WS_SEND_MESSAGE,
} from './actions/constants/web-socket';
import { socketMiddleware } from './middleware/socketMiddleware';
import { rootReducers } from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClosing: WS_CONNECTION_CLOSED,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ITEMS,
};

const enhancers = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducers, enhancers);
