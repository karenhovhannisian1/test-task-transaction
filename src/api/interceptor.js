import axios from 'axios';
import { TOKEN } from '../configs/constants';

axios.interceptors.request.use(
  function(request) {
    request['headers']['common']['Accept'] = 'application/json; charset=utf-8';

    const token = localStorage.getItem(TOKEN);

    if (token) {
      request['headers']['Authorization'] = `Bearer ${token}`;
    }

    return request;
  },
  function(error) {
    return Promise.reject(error);
  }
);
