import { URL } from './const';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.errorMessage ?? 'При загрузке данных произошла ошибка');
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
