import React, {memo} from 'react';
import {Box, NativeBaseProvider} from 'native-base';

export default memo(function ({children}) {
  return (
    <NativeBaseProvider>
      <Box safeArea flex={1}>
        {children}
      </Box>
    </NativeBaseProvider>
  );
});
