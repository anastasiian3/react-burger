import { URL } from './const';

const checkResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res.errorMessage ?? 'При загрузке данных произошла ошибка');
};

export const getServerData = () => {
  return fetch(URL).then(checkResponce);
};
