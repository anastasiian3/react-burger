import { URL } from './const';
import { getCookie, setCookie } from './cookies';

// const checkResponse = (res) => {
//   return res.ok ? res.json() : Promise.reject(res.errorMessage ?? 'При загрузке данных произошла ошибка');
// };

const checkResponse = (res) => {
  //console.log(res);
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getServerData = () => {
  return fetch(`${URL}/ingredients`).then(checkResponse);
};

export const makeOrder = (orderData) => {
  return fetch(`${URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: orderData }),
  }).then(checkResponse);
};

export const createNewUser = (data) => {
  const { name, email, password } = data;
  return fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, email: email, password: password }),
  }).then(checkResponse);
};

export const loginUser = (data) => {
  const { email, password } = data;
  return fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  }).then(checkResponse);
};

export const sendForgotPasswordRequest = (email) => {
  return fetch(`${URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  }).then(checkResponse);
};

export const sendResetPasswordRequest = (data) => {
  const { password, token } = data;
  return fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: password, token: token }),
  }).then(checkResponse);
};

export const logoutUser = () => {
  return fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  }).then(checkResponse);
};

export function getUserInfo() {
  //const accessToken = getCookie('accessToken');
  return fetchWithRefresh(`${URL}/auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    },
  });
}

export function changeUserInfo(form) {
  const accessToken = getCookie('accessToken');
  return fetch(`${URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify(form),
  }).then(checkResponse);
}

export function getToken() {
  const refreshToken = getCookie('refreshToken');
  return fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: refreshToken,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      console.log(res);
      return res;
    });
}

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (error) {
    //console.log(error);
    if (error.message === 'jwt expired') {
      console.log(error.message);
      const refreshData = await getToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      setCookie('accessToken', refreshData.accessToken);
      setCookie('refreshToken', refreshData.refreshToken);

      options.headers.Authorization = refreshData.accessToken;

      const res = await fetch(url, options);
      return await checkResponse(res);
    }
    return Promise.reject(error);
  }
};
