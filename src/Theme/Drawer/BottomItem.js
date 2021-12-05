import React, {memo, useContext} from 'react';
import {Pressable, Text} from 'native-base';
import {AuthDispatchContext} from '@context/auth/AuthProvider';
import {logoutFlow} from '@context/auth/authRequest';
import ar from '@lang/ar';

const common_elems = ar.common_elements;
export default memo(function () {
  const authDispatch = useContext(AuthDispatchContext);

  const logout = () => {
    logoutFlow({dispatch: authDispatch});
  };

  return (
    <Pressable px="5" py="3" rounded="md" onPress={logout}>
      {/* <Icon
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.500'
                    }
                    size="5"
                    // as={<MaterialCommunityIcons name={getIcon(name)} />}
                  /> */}
      <Text fontWeight="500" color="gray.700">
        {common_elems.logout}
      </Text>
    </Pressable>
  );
});
