import {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export default ({key, prop}) => {
  const [value, setValue] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    EncryptedStorage.getItem(key)
      .then(session => {
        const storedValue = JSON.parse(session);
        if (storedValue && storedValue[prop]) {
          setValue(storedValue[prop]);
        }
      })
      .catch(err => setError(err));
  }, [key, prop]);

  useEffect(() => {
    (async () => {
      try {
        await EncryptedStorage.setItem(key, JSON.stringify({[prop]: value}));
      } catch (err) {
        setError(err);
      }
    })();
  }, [value, key, prop]);

  return [value, setValue, error];
};
