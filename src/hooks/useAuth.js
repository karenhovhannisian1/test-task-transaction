import React from 'react';
import API from '../api';
import { useStateValue } from '../context';
import { getUserSuccess } from '../context/actions';
import { useHistory } from 'react-router-dom';
import { SIGN_IN_PATH } from '../configs/constants';

export function useAuth() {
  const [{}, dispatch] = useStateValue();

  async function getUserInfo() {
    try {
      const { data } = await API.getUserInfo();
      dispatch(getUserSuccess(data.user_info_token));
    } catch (e) {
      localStorage.clear();
      useHistory.push(SIGN_IN_PATH);
    }
  }

  return {
    getUserInfo
  };
}
