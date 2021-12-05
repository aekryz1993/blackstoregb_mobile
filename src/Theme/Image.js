import React from 'react';
import {Image} from 'native-base';

export const RoundImage = ({uri, fallback}) => {
  return (
    <Image
      size={100}
      alt="fallback text"
      borderRadius={100}
      source={{
        uri: {uri},
      }}
      fallbackSource={{
        uri: {fallback},
      }}
    />
  );
};
