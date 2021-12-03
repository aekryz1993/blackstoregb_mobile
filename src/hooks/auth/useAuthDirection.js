import {useEffect, useState} from 'react';
import useCheckSession from './useCheckSession';

export default () => {
  const [direction, setDirection] = useState();
  const {storedToken, user, error, status, token, fromLogin} =
    useCheckSession();
  const {isActive, isAdmin} = user;
  const isAuth = Object.keys(user).length !== 0 && isActive;

  useEffect(() => {
    switch (status) {
      case 'not_auth':
        setDirection('login');
        break;
      case 'loading':
        setDirection('loading');
        break;
      case 'auth':
        if (isAuth && isAdmin) {
          setDirection('admin');
        } else if (isAuth && !isAdmin) {
          setDirection('consumer');
        }
        break;
      case 'error':
        setDirection('error');
        break;
      default:
        break;
    }
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
