import {
  changeUserInfo,
  createNewUser,
  getToken,
  getUserInfo,
  loginUser,
  logoutUser,
  sendForgotPasswordRequest,
  sendResetPasswordRequest,
} from '../../utils/api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies';

export const USER_REGISTRATION_REQUEST = 'USER_REGISTRATION_REQUEST';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILURE = 'USER_REGISTRATION_FAILURE';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

// export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
// export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
// export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

export const AUTH_CHECKED = 'AUTH_CHECKED';

export function userRegister(form) {
  return function (dispatch) {
    dispatch({
      type: USER_REGISTRATION_REQUEST,
    });
    createNewUser(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_REGISTRATION_SUCCESS,
            payload: res.user,
          });
          console.log(res);
          setCookie('accessToken', res.accessToken);
          setCookie('refreshToken', res.refreshToken);
        } else {
          dispatch({
            type: USER_REGISTRATION_FAILURE,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: USER_REGISTRATION_FAILURE,
        });
      });
  };
}

export const authorizeUser = (form) => (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  return loginUser(form)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.user,
        });
        console.log(res);
        setCookie('accessToken', res.accessToken);
        setCookie('refreshToken', res.refreshToken);
      } else {
        dispatch({
          type: USER_LOGIN_FAILURE,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Возможно, вы ввели неверный пароль');
      dispatch({
        type: USER_LOGIN_FAILURE,
      });
    });
};

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    sendForgotPasswordRequest(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          });
          console.log(res);
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILURE,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: FORGOT_PASSWORD_FAILURE,
        });
      });
  };
}

export function resetPassword(data) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    sendResetPasswordRequest(data)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
          console.log(res);
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILURE,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: RESET_PASSWORD_FAILURE,
        });
      });
  };
}

export const logout = () => (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  return logoutUser()
    .then((res) => {
      if (res && res.success) {
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
        dispatch({
          type: USER_LOGOUT_SUCCESS,
          user: null,
        });
        console.log(res);
      } else {
        dispatch({
          type: USER_LOGOUT_FAILURE,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: USER_LOGOUT_FAILURE,
      });
    });
};

export const getUser = () => (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  return getUserInfo()
    .then((res) => {
      //console.log(res);
      if (res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.user,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_USER_FAILURE,
      });
      //console.log(error);
    });
};

export const checkAuth = () => (dispatch) => {
  if (getCookie('accessToken')) {
    dispatch(getUser()).finally(() => {
      dispatch({ type: AUTH_CHECKED });
    });
  } else {
    dispatch({ type: AUTH_CHECKED });
  }
};

export function changeUser(form) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    changeUserInfo(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res.user,
          });
          console.log(res.user);
        } else {
          dispatch({
            type: UPDATE_USER_FAILURE,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: UPDATE_USER_FAILURE,
        });
      });
  };
}
