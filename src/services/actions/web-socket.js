import { wsUrl } from '../../utils/const';
import { getCookie } from '../../utils/cookies';

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const WS_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE';

export const startConnectionWebSocket = () => (dispatch) => {
  dispatch({
    type: WS_CONNECTION_START,
    payload: `${wsUrl}/all`,
  });
};

export const startTokenConnectionWebSocket = () => (dispatch) => {
  const accessToken = getCookie('accessToken').split('Bearer ')[1];
  dispatch({
    type: WS_CONNECTION_START,
    payload: `${wsUrl}?token=${accessToken}`,
  });
};

export const closeConnectionWebSocket = () => (dispatch) => {
  dispatch({
    type: WS_CONNECTION_CLOSED,
  });
};
