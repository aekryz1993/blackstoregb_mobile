import {postApi, getApi} from '@apis';
import EncryptedStorage from 'react-native-encrypted-storage';

export const loginFlow = ({body = {}, dispatch}) => {
  (async () => {
    try {
      dispatch({type: 'AUTH_REQUEST'});

      const response = await postApi({routePath: 'api/auth/login', body});

      if (response.data.success) {
        dispatch({
          type: 'LOGIN_SUCCEED',
          payload: {
            user: response.data.currentUser,
          },
        });
        await fetchToken(dispatch);
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
  })();
};

export const fetchToken = dispatch => {
  (async () => {
    try {
      const response = await getApi('api/userSession/token');
      dispatch({type: 'SETUPTOKEN', payload: {token: response?.data?.token}});
    } catch (error) {
      dispatch({
        type: 'SERVER_ERROR',
        payload: {error: error.message},
      });
    }
  })();
};

export const checkSession = ({body = {}, dispatch}) => {
  (async () => {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      const stoken = JSON.parse(session);

      if (stoken.token) {
        const response = await postApi({
          routePath: 'api/userSession/session',
          body: stoken,
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
  })();
};
