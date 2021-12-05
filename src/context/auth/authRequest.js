import {postApi, getApi} from '@apis';
import EncryptedStorage from 'react-native-encrypted-storage';

export const loginFlow = ({body = {}, dispatch, ac}) => {
  async function login() {
    try {
      dispatch({type: 'AUTH_REQUEST'});

      const response = await postApi({routePath: 'api/auth/login', body, ac});
      if (response?.data?.success) {
        dispatch({
          type: 'LOGIN_SUCCEED',
          payload: {
            user: response.data.currentUser,
          },
        });
        await fetchToken({dispatch, ac});
      } else {
        throw response;
      }
    } catch (error) {
      if (error.status === 500) {
        dispatch({
          type: 'SERVER_ERROR',
          payload: {error: error.message},
        });
      } else {
        dispatch({
          type: 'LOGIN_FAILED',
          payload: {error: error.message},
        });
      }
    }
  }
  login();
};

export const fetchToken = ({dispatch, ac}) => {
  async function fetch() {
    try {
      const response = await getApi({routePath: 'api/userSession/token', ac});
      dispatch({type: 'SETUPTOKEN', payload: {token: response?.data?.token}});
    } catch (error) {
      dispatch({
        type: 'SERVER_ERROR',
        payload: {error: error.message},
      });
    }
  }
  fetch();
};

export const checkSession = ({dispatch, ac}) => {
  async function check() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      const stoken = JSON.parse(session);

      if (stoken.token) {
        const response = await postApi({
          routePath: 'api/userSession/session',
          body: stoken,
          ac,
        });

        if (response.data.success) {
          dispatch({
            type: 'AUTHED_SESSION',
            payload: {
              user: response.data.currentUser,
              token: response.data.token,
            },
          });
        }
      } else {
        throw {status: 400};
      }
    } catch (error) {
      if (error.status === 500) {
        dispatch({
          type: 'SERVER_ERROR',
          payload: {error: error.message},
        });
      } else {
        dispatch({
          type: 'NOTAUTHED_SESSION',
        });
      }
    }
  }
  check();
};

export const logoutFlow = ({dispatch, ac}) => {
  async function logout() {
    try {
      dispatch({
        type: 'LOGOUT_REQUEST',
      });
      const response = await getApi({routePath: 'api/userSession/logout', ac});

      if (response?.data?.success) {
        await EncryptedStorage.removeItem('user_session');
        dispatch({
          type: 'LOGOUT_SUCCEED',
        });
      }
    } catch (error) {
      dispatch({
        type: 'SERVER_ERROR',
        payload: {error: error.message},
      });
    }
  }
  logout();
};
