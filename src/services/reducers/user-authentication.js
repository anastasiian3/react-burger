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
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTRATION_FAILURE,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
} from '../actions/user-authentication';

const userInitialState = {
  user: {
    name: '',
    email: '',
  },

  isAuth: false,

  userRegistrationRequest: false,
  userRegistrationSuccess: false,
  userRegistrationFailure: false,

  userLoginRequest: false,
  userLoginSuccess: false,
  userLoginFailure: false,

  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailure: false,

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailure: false,

  logoutRequest: false,
  logoutSuccess: false,
  logoutFailure: false,

  getUserRequest: false,
  getUserSuccess: false,
  getUserFailure: false,

  refreshTokenRequest: false,
  refreshTokenSuccess: false,
  refreshTokenFailure: false,
};

export const userAuthReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST: {
      return {
        ...state,
        userRegistrationRequest: true,
        isAuth: false,
      };
    }
    case USER_REGISTRATION_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        userRegistrationRequest: false,
        userRegistrationSuccess: true,
        isAuth: true,
      };
    }
    case USER_REGISTRATION_FAILURE: {
      return {
        ...state,
        userRegistrationFailure: true,
        userRegistrationSuccess: false,
        isAuth: false,
      };
    }
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        userLoginRequest: true,
        isAuth: false,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,

        userLoginRequest: false,
        userLoginSuccess: true,
        isAuth: true,
      };
    }
    case USER_LOGIN_FAILURE: {
      return {
        ...state,
        userLoginFailure: true,
        isAuth: false,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: true,
      };
    }
    case FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        forgotPasswordSuccess: false,
        forgotPasswordFailure: true,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: true,
      };
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        resetPasswordSuccess: false,
        resetPasswordFailure: true,
      };
    }
    case USER_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutSuccess: true,
        user: '',
        isAuth: false,
      };
    }
    case USER_LOGOUT_FAILURE: {
      return {
        ...state,
        logoutFailure: true,
        isAuth: false,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        getUserRequest: false,
        getUserSuccess: true,
      };
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        getUserFailure: true,
        getUserRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
