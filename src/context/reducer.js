import {LOGIN_SUCCESS, GET_USER_SUCCESS} from "./actions";

export const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: {}
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS: {
      return { ...state, isLoggedIn: true };
    }
    case GET_USER_SUCCESS: {
      return { ...state, user: payload.user };
    }
    default:
      return state;
  }
};
