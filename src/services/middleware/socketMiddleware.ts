import { Middleware } from 'redux';
import { getCookie } from '../../utils/cookies';
import { WS_CONNECTION_START } from '../actions/constants/web-socket';
import { RootState } from '../types';
import { TWebSocketActions } from '../types/web-socket';

export const socketMiddleware = (wsActions: TWebSocketActions): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClosing, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        url = action.payload;
        socket = new WebSocket(payload);
        isConnected = true;
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          console.log('socket.onerror', event);
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log('socket.onclose', event);
            dispatch({ type: onError, payload: event });
          }
          dispatch({ type: onClose, payload: event });

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              if (url.includes('token')) {
                const token = getCookie('accessToken');
                if (token !== undefined) {
                  const accessToken = token.split('Bearer ')[1];
                  url = url.replace(/\?token=.*/, `orders?token=${accessToken}`);
                }
              }
              dispatch({
                type: WS_CONNECTION_START,
                payload: url,
              });
            }, 3000);
          }
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        if (type === wsClosing) {
          isConnected = false;
          clearTimeout(reconnectTimer);
          reconnectTimer = 0;
          socket.close(1000, 'Работа приложения закончена');
        }
      }

      next(action);
    };
  };
};
