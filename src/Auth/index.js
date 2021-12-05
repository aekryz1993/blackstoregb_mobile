import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAuthDirection from '@hooks/auth/useAuthDirection';

import Loading from '@UI/Loading';
import ServerError from '@UI/ServerError';
import Login from './Login';
import Admin from '@Admin';
import Consumer from '@Consumer';

const Stack = createNativeStackNavigator();

export default function () {
  const {direction, fromLogin} = useAuthDirection();

  if (direction === 'loading' && !fromLogin) {
    return <Loading />;
  }

  if (direction === 'error') {
    return <ServerError />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {direction === 'admin' ? (
          <Stack.Screen name="Admin" component={Admin} />
        ) : direction === 'consumer' ? (
          <Stack.Screen name="Consumer" component={Consumer} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
