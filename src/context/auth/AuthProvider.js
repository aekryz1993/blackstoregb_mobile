import React, {useReducer, createContext} from 'react';
import logger from 'logger-for-use-reducer';

const initialAuth = {
  user: {},
  token: null,
  error: null,
  status: 'loading',
  fromLogin: false, // in order to load spinner on the button
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return {
        ...state,
        status: 'loading',
        fromLogin: true,
      };
    case 'LOGIN_SUCCEED':
      return {
        ...state,
        status: 'auth',
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        status: 'not_auth',
        user: {},
        token: null,
        error: action.payload.error,
        fromLogin: false,
      };
    case 'AUTHED_SESSION':
      return {
        ...state,
        status: 'auth',
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        fromLogin: false,
      };
    case 'NOTAUTHED_SESSION':
      return {
        ...state,
        status: 'not_auth',
        user: {},
        token: null,
        fromLogin: false,
      };
    case 'SETUPTOKEN':
      return {
        ...state,
        ...action.payload,
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        status: 'loading',
        fromLogin: false,
      };
    case 'LOGOUT_SUCCEED':
      console.log(state);
      return {
        ...state,
        status: 'not_auth',
        user: {},
        token: null,
        error: null,
        fromLogin: false,
      };
    case 'LOGOUT_FAILED':
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
        fromLogin: false,
      };
    case 'SERVER_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
        fromLogin: false,
      };
    default:
      return state;
  }
};

export const AuthStateContext = createContext({
  authState: initialAuth,
});

export const AuthDispatchContext = createContext({
  authDispatch: () => null,
});

export default function ({children}) {
  const [authState, authDispatch] = useReducer(
    __DEV__ ? logger(reducer) : reducer,
    initialAuth,
  );

  return (
    <AuthStateContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={authDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}
