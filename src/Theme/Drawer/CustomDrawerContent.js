import React, {memo} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Divider, HStack, Icon, Pressable, Text, VStack} from 'native-base';
import UpperItem from './UpperItem';
import BottomItem from './BottomItem';

export default memo(function (props) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="4" mx="1">
        <UpperItem
          user={props.user}
          // fallback={require('@images/product-placeholder.png')}
        />
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                key={index}
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? 'rgba(6, 182, 212, 0.1)'
                    : 'transparent'
                }
                onPress={() => {
                  props.navigation.navigate(name);
                }}>
                <HStack space="7" alignItems="center">
                  {/* <Icon
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.500'
                    }
                    size="5"
                    // as={<MaterialCommunityIcons name={getIcon(name)} />}
                  /> */}
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.700'
                    }>
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
          <BottomItem lable={props.label} />
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
});
