import { IChangeInfo, ILogin, INewPasswordRequest, IRegister } from '../services/types/auth';
import { URL } from './const';
import { getCookie, setCookie } from './cookies';

type TOptions = {
  headers: {
    'Content-Type': string;
    authorization?: string;
  };
  method?: string;
  body?: string;
};

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((res) => Promise.reject(res));
};

function request(url: string, options?: TOptions) {
  return fetch(url, options).then(checkResponse);
}

export const getServerData = () => {
  return request(`${URL}/ingredients`);
};

export const makeOrder = (orderData: Array<string>) => {
  return request(`${URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', authorization: getCookie('accessToken') },
    body: JSON.stringify({ ingredients: orderData }),
  });
};

export const createNewUser = (data: IRegister) => {
  const { name, email, password } = data;
  return request(`${URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, email: email, password: password }),
  });
};

export const loginUser = (data: ILogin) => {
  const { email, password } = data;
  return request(`${URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  });
};

export const sendForgotPasswordRequest = (email: string) => {
  return request(`${URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  });
};

export const sendResetPasswordRequest = (data: INewPasswordRequest) => {
  const { password, token } = data;
  return request(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: password, token: token }),
  });
};

export const logoutUser = () => {
  return request(`${URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  });
};

export function getUserInfo() {
  return fetchWithRefresh(`${URL}/auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
  });
}

export function changeUserInfo(form: IChangeInfo) {
  return request(`${URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
    body: JSON.stringify(form),
  });
}

export function getToken() {
  const refreshToken = getCookie('refreshToken');
  return request(`${URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then((res) => {
    return res;
  });
}

const fetchWithRefresh = async (url: string, options: TOptions) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      const refreshData = await getToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      setCookie('accessToken', refreshData.accessToken);
      setCookie('refreshToken', refreshData.refreshToken);

      options.headers.authorization = refreshData.accessToken;

      const res = await fetch(url, options);
      return await checkResponse(res);
    }
    return Promise.reject(error);
  }
};
