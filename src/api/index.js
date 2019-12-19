import { TOKEN } from '../configs/constants';
import axios from 'axios';

const API_URL = 'http://193.124.114.46:3001';

export default class API {
  static signUp(email, password, username) {
    return axios.post(`${API_URL}/users`, { username, email, password });
  }

  static signIn(email, password) {
    return axios.post(`${API_URL}/sessions/create`, { email, password });
  }

  static getUserInfo() {
    return axios.get(`${API_URL}/api/protected/user-info`);
  }

  static getTransactionsList() {
    return axios.get(`${API_URL}/api/protected/transactions`);
  }

  static getUsersList(filter) {
    return axios.post(`${API_URL}/api/protected/users/list`, { filter });
  }

  static createTransaction(name, amount) {
    return axios.post(`${API_URL}/api/protected/transactions`, {
      name,
      amount
    });
  }

  static postData(text) {
    return fetch(`${API_URL}/word`, {
      method: 'POST',
      headers: { Authorization: localStorage.getItem(TOKEN) },
      body: JSON.stringify({
        text
      })
    });
  }

  static getWords(date) {
    return fetch(`${API_URL}/wordsForUser`, {
      method: 'POST',
      headers: { Authorization: localStorage.getItem(TOKEN) },
      body: JSON.stringify({
        date
      })
    });
  }

  static verifyAccount(email, hash) {
    return fetch(`${API_URL}/verify-account/${email}/${hash}`, {
      method: 'POST',
      headers: { Authorization: localStorage.getItem(TOKEN) }
    });
  }

  static resetPassword(email) {
    return fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: { Authorization: localStorage.getItem(TOKEN) },
      body: JSON.stringify({
        email
      })
    });
  }

  static changePassword(email, hash, password) {
    return fetch(`${API_URL}/change-password/${email}/${hash}`, {
      method: 'POST',
      headers: { Authorization: localStorage.getItem(TOKEN) },
      body: JSON.stringify({
        password
      })
    });
  }
}
