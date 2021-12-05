import {useEffect, useState} from 'react';
import getUserInfo from '../utils/userInfo';

export default function (userObj) {
  const [user, setUser] = useState({});

  useEffect(() => {
    let doUpdate = true;
    if (doUpdate) {
      setUser(getUserInfo(userObj));
    }

    return () => (doUpdate = false);
  }, [setUser, userObj]);

  return user;
}
