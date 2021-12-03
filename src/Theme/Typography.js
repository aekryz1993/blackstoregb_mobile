import React from 'react';
import {Heading} from 'native-base';

export const Head = ({text, type, size, fw}) => (
  <Heading
    size={size}
    fontWeight={fw}
    color={type === 'sh' ? 'coolGray.600' : 'coolGray.800'}
    _dark={
      type === 'sh'
        ? {
            color: 'warmGray.50',
          }
        : {
            color: 'warmGray.200',
          }
    }>
    {text}
  </Heading>
);
