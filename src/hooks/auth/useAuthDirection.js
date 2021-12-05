import {useEffect, useState} from 'react';
import useCheckSession from './useCheckSession';

export default () => {
  const [direction, setDirection] = useState();
  const {storedToken, user, error, status, token, fromLogin} =
    useCheckSession();
  const {isActive, isAdmin} = user;
  const isAuth = Object.keys(user).length !== 0 && isActive;

  useEffect(() => {
    let doUpdate = true;

    switch (status) {
      case 'not_auth':
        doUpdate && setDirection('login');
        break;
      case 'loading':
        doUpdate && setDirection('loading');
        break;
      case 'auth':
        if (isAuth && isAdmin) {
          doUpdate && setDirection('admin');
        } else if (isAuth && !isAdmin) {
          doUpdate && setDirection('consumer');
        }
        break;
      case 'error':
        doUpdate && setDirection('error');
        break;
      default:
        break;
    }
    return () => (doUpdate = false);
  }, [isAdmin, isAuth, status]);

  return {
    direction,
    user,
    storedToken,
    token,
    error,
    status,
    fromLogin,
  };
};
