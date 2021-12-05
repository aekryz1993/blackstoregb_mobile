import React from 'react';
import {
  Spinner,
  HStack,
  Heading,
  Center,
  NativeBaseProvider,
} from 'native-base';
import ar from '../../assets/lang/ar.json';

const loadingText = ar.loading;

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <HStack space={2} alignItems="center">
          <Spinner
            color="tertiary.900"
            size="lg"
            accessibilityLabel="Loading posts"
          />
          <Heading color="tertiary.900" fontSize="xl">
            {loadingText}
          </Heading>
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
};
