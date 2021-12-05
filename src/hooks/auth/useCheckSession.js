import {useContext, useEffect} from 'react';
import {
  AuthStateContext,
  AuthDispatchContext,
} from '@context/auth/AuthProvider';
import {checkSession} from '@context/auth/authRequest';
import EncryptedStorage from 'react-native-encrypted-storage';

export default () => {
  const authDispatch = useContext(AuthDispatchContext);
  const {user, error, status, token, fromLogin} = useContext(AuthStateContext);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const ac = new AbortController();
    // check the session only if the token is defined and the request didn't come from login screen
    if (!fromLogin && status !== 'not_auth') {
      checkSession({
        dispatch: authDispatch,
        ac,
      });
    }
    return () => ac.abort();
  }, [authDispatch, fromLogin, status]);

  useEffect(() => {
    // store the token only if request came from login screen and the status is authenticated
    async function setToken() {
      if (status === 'auth' && fromLogin) {
        await EncryptedStorage.setItem(
          'user_session',
          JSON.stringify({token: token}),
        );
      }
    }
    setToken();
    // return () => ();
  }, [fromLogin, status, token]);

  return {
    user,
    token,
    error,
    status,
    fromLogin,
  };
};
