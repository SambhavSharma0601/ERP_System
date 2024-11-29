// redux.js
import { createStore } from 'redux';

// Action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

// Action creators
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

// Reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

// Create Redux store
export const store = createStore(authReducer);
