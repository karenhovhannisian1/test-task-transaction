export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  payload: { user }
});
