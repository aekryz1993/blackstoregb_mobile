import React, {memo} from 'react';
import {Box, HStack, VStack} from 'native-base';
// import {RoundImage} from '@Theme/Image';
import {Head} from '@Theme/Typography';

export default memo(function ({user}) {
  return (
    <Box px="4">
      <HStack space="10">
        {/* <RoundImage uri={user?.pictureUri} /> */}
        <VStack space="2">
          <Head text={user?.fullname} size="md" fw="600" />
          <Head text={user?.username} type="sh" size="xs" />
          <Head text={user && user.email} type="sh" size="xs" />
        </VStack>
      </HStack>
    </Box>
  );
});
