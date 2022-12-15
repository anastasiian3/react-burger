import {
  changeUserInfo,
  createNewUser,
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

export const AUTH_CHECKED = 'AUTH_CHECKED';

const checkSuccess = (res) => {
  return res && res.success;
};

export function userRegister(form) {
  return function (dispatch) {
    dispatch({
      type: USER_REGISTRATION_REQUEST,
    });
    createNewUser(form)
      .then((res) => {
        if (checkSuccess) {
          dispatch({
            type: USER_REGISTRATION_SUCCESS,
            payload: res.user,
          });
          setCookie('accessToken', res.accessToken);
          setCookie('refreshToken', res.refreshToken);
        } else {
          dispatch(userRegistrationFailure);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(userRegistrationFailure);
      });
  };
}

export const authorizeUser = (form) => (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  return loginUser(form)
    .then((res) => {
      if (checkSuccess) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.user,
        });
        setCookie('accessToken', res.accessToken);
        setCookie('refreshToken', res.refreshToken);
      } else {
        dispatch(userLoginFailure);
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Возможно, вы ввели неверный пароль');
      dispatch(userLoginFailure);
    });
};

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    sendForgotPasswordRequest(email)
      .then((res) => {
        if (checkSuccess) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          });
        } else {
          dispatch(forgotPasswordFailure);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(forgotPasswordFailure);
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
        if (checkSuccess) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
        } else {
          dispatch(resetPasswordFailure);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(resetPasswordFailure);
      });
  };
}

export const logout = () => (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  return logoutUser()
    .then((res) => {
      if (checkSuccess) {
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
        dispatch({
          type: USER_LOGOUT_SUCCESS,
          user: null,
        });
      } else {
        dispatch(userLogoutFailure);
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch(userLogoutFailure);
    });
};

export const getUser = () => (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  return getUserInfo()
    .then((res) => {
      if (checkSuccess) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.user,
        });
      }
    })
    .catch((error) => {
      dispatch(getUserFailure);
      console.log(error);
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
        if (checkSuccess) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res.user,
          });
        } else {
          dispatch(changeUserFailure);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(changeUserFailure);
      });
  };
}

function userRegistrationFailure() {
  return {
    type: USER_REGISTRATION_FAILURE,
  };
}

function userLoginFailure() {
  return {
    type: USER_LOGIN_FAILURE,
  };
}

function forgotPasswordFailure() {
  return {
    type: FORGOT_PASSWORD_FAILURE,
  };
}

function resetPasswordFailure() {
  return {
    type: RESET_PASSWORD_FAILURE,
  };
}

function userLogoutFailure() {
  return {
    type: USER_LOGOUT_FAILURE,
  };
}

function getUserFailure() {
  return {
    type: GET_USER_FAILURE,
  };
}

function changeUserFailure() {
  return {
    type: GET_USER_FAILURE,
  };
}
