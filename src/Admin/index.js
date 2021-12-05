import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import CustomDrawerContent from '@Theme/Drawer/CustomDrawerContent';
import Users from '../Users';
import useUserInfo from '@hooks/useUserInfo';
import {AuthStateContext} from '@context/auth/AuthProvider';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerScreens = () => {
  const {user} = React.useContext(AuthStateContext);

  const {userInfo, pictureUri} = useUserInfo(user);

  const userObj = {
    username: userInfo?.username,
    fullname: `${userInfo?.firstname} ${userInfo?.lastname}`,
    email: userInfo?.email,
    uri: pictureUri,
  };

  return (
    <NativeBaseProvider>
      <Drawer.Navigator
        drawerContent={props => (
          <CustomDrawerContent {...props} user={userObj} />
        )}>
        <Drawer.Screen name="Users" component={Users} />
      </Drawer.Navigator>
    </NativeBaseProvider>
  );
};

export default function () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DrawerScreens">
        {props => <DrawerScreens {...props} />}
      </Stack.Screen>
      {/* <Stack.Screen
        name="NotificationScreen"
        options={{headerShown: true, title: 'Notifications'}}
      /> */}
    </Stack.Navigator>
  );
}
