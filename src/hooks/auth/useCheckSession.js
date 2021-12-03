import {useContext, useEffect} from 'react';
import {
  AuthStateContext,
  AuthDispatchContext,
} from '@context/auth/AuthProvider';
import {checkSession} from '@context/auth/authRequest';
import EncryptedStorage from 'react-native-encrypted-storage';
// import useLocalStorage from './useLocalStorage';

export default () => {
  const authDispatch = useContext(AuthDispatchContext);
  // const [storedToken, setToken] = useLocalStorage({
  //   key: 'user_session',
  //   prop: 'token',
  // });
  const {user, error, status, token, fromLogin} = useContext(AuthStateContext);

  useEffect(() => {
    // check the session only if the token is defined and the request didn't come from login screen
    if (!fromLogin) {
      checkSession({
        // body: {token: storedToken},
        dispatch: authDispatch,
      });
    }
  }, [authDispatch, fromLogin]);

  useEffect(() => {
    // store the token only if request came from login screen and the status is authenticated
    (async () => {
      if (status === 'auth' && fromLogin) {
        // setToken(token);
        // await EncryptedStorage.setItem(key, JSON.stringify({[prop]: value}));
        await EncryptedStorage.setItem(
          'user_session',
          JSON.stringify({token: token}),
        );
      }
    })();
  }, [fromLogin, status, token]);

  return {
    // storedToken,
    user,
    token,
    error,
    status,
    fromLogin,
  };
};
