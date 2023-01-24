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
import { AppDispatch, AppThunk } from '../types';
import { IChangeInfo, ILogin, INewPasswordRequest, IRegister, IUser } from '../types/auth';
import {
  AUTH_CHECKED,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTRATION_FAILURE,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
} from './constants/user-authentication';

export interface IUserRegistrationRequest {
  readonly type: typeof USER_REGISTRATION_REQUEST;
}
export interface IUserRegistrationSuccess {
  readonly type: typeof USER_REGISTRATION_SUCCESS;
  readonly payload: IUser;
}
export interface IUserRegistrationFailure {
  readonly type: typeof USER_REGISTRATION_FAILURE;
}

export interface IUserLoginRequest {
  readonly type: typeof USER_LOGIN_REQUEST;
}
export interface IUserLoginSuccess {
  readonly type: typeof USER_LOGIN_SUCCESS;
  readonly payload: IUser;
}
export interface IUserLoginFailure {
  readonly type: typeof USER_LOGIN_FAILURE;
}

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export interface IForgotPasswordFailure {
  readonly type: typeof FORGOT_PASSWORD_FAILURE;
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailure {
  readonly type: typeof RESET_PASSWORD_FAILURE;
}

export interface IUserLogoutRequest {
  readonly type: typeof USER_LOGOUT_REQUEST;
}
export interface IUserLogoutSuccess {
  readonly type: typeof USER_LOGOUT_SUCCESS;
  readonly user: string;
}
export interface IUserLogoutFailure {
  readonly type: typeof USER_LOGOUT_FAILURE;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: IUser;
}
export interface IGetUserFailure {
  readonly type: typeof GET_USER_FAILURE;
}

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: IUser;
}
export interface IUpdateUserFailure {
  readonly type: typeof UPDATE_USER_FAILURE;
}

export interface IAuthChecked {
  readonly type: typeof AUTH_CHECKED;
}

export type TUserAuthActions =
  | IUserRegistrationRequest
  | IUserRegistrationSuccess
  | IUserRegistrationFailure
  | IUserLoginRequest
  | IUserLoginSuccess
  | IUserLoginFailure
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailure
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailure
  | IUserLogoutRequest
  | IUserLogoutSuccess
  | IUserLogoutFailure
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailure
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailure
  | IAuthChecked;

const checkSuccess = (res: any) => {
  return res && res.success;
};

export const userRegister = (form: IRegister) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_REGISTRATION_REQUEST,
    });
    createNewUser(form)
      .then((res) => {
        if (checkSuccess(res)) {
          dispatch({
            type: USER_REGISTRATION_SUCCESS,
            payload: res.user,
          });
          setCookie('accessToken', res.accessToken);
          setCookie('refreshToken', res.refreshToken);
        } else {
          dispatch(userRegistrationFailure());
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(userRegistrationFailure());
      });
  };
};

export const authorizeUser = (form: ILogin) => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  return loginUser(form)
    .then((res) => {
      if (checkSuccess(res)) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.user,
        });
        setCookie('accessToken', res.accessToken);
        setCookie('refreshToken', res.refreshToken);
      } else {
        dispatch(userLoginFailure());
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Возможно, вы ввели неверный пароль');
      dispatch(userLoginFailure());
    });
};

export function forgotPassword(email: string) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    sendForgotPasswordRequest(email)
      .then((res) => {
        if (checkSuccess(res)) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          });
        } else {
          dispatch(forgotPasswordFailure());
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(forgotPasswordFailure());
      });
  };
}

export function resetPassword(data: INewPasswordRequest) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    sendResetPasswordRequest(data)
      .then((res) => {
        if (checkSuccess(res)) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
        } else {
          dispatch(resetPasswordFailure());
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(resetPasswordFailure());
      });
  };
}

export const logout = () => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  return logoutUser()
    .then((res) => {
      if (checkSuccess(res)) {
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
        dispatch({
          type: USER_LOGOUT_SUCCESS,
          user: '',
        });
      } else {
        dispatch(userLogoutFailure());
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch(userLogoutFailure());
    });
};

export const getUser = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  return getUserInfo()
    .then((res) => {
      if (checkSuccess(res)) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.user,
        });
      }
    })
    .catch((error) => {
      dispatch(getUserFailure());
      console.log(error);
    });
};

export const checkAuth = (): AppThunk => (dispatch) => {
  if (getCookie('accessToken')) {
    dispatch(getUser()).finally(() => {
      dispatch({ type: AUTH_CHECKED });
    });
  } else {
    dispatch({ type: AUTH_CHECKED });
  }
};

export function changeUser(form: IChangeInfo) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    changeUserInfo(form)
      .then((res) => {
        if (checkSuccess(res)) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res.user,
          });
        } else {
          dispatch(changeUserFailure());
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(changeUserFailure());
      });
  };
}

function userRegistrationFailure(): IUserRegistrationFailure {
  return {
    type: USER_REGISTRATION_FAILURE,
  };
}

function userLoginFailure(): IUserLoginFailure {
  return {
    type: USER_LOGIN_FAILURE,
  };
}

function forgotPasswordFailure(): IForgotPasswordFailure {
  return {
    type: FORGOT_PASSWORD_FAILURE,
  };
}

function resetPasswordFailure(): IResetPasswordFailure {
  return {
    type: RESET_PASSWORD_FAILURE,
  };
}

function userLogoutFailure(): IUserLogoutFailure {
  return {
    type: USER_LOGOUT_FAILURE,
  };
}

function getUserFailure(): IGetUserFailure {
  return {
    type: GET_USER_FAILURE,
  };
}

function changeUserFailure(): IUpdateUserFailure {
  return {
    type: UPDATE_USER_FAILURE,
  };
}
