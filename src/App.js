import 'react-native-gesture-handler';
import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import Auth from '@Auth';
import AuthProvider from '@context/auth/AuthProvider';

const fonts = {
  heading: 'Roboto',
  body: 'Roboto',
  mono: 'Roboto',
};

const fontConfig = {
  Roboto: {
    100: {
      normal: 'Roboto-Light',
      italic: 'Roboto-LightItalic',
    },
    200: {
      normal: 'Roboto-Thin',
      italic: 'Roboto-ThinItalic',
    },
    500: {
      normal: 'Roboto-Regular',
      italic: 'Roboto-Italic',
    },
    600: {
      normal: 'Roboto-Medium',
      italic: 'Roboto-MediumItalic',
    },
    800: {
      normal: 'Roboto-Bold',
      italic: 'Roboto-BoldItalic',
    },
    900: {
      normal: 'Roboto-Black',
      italic: 'Roboto-BlackItalic',
    },
  },
};

const config = {
  // initialColorMode: 'dark',
};

const theme = extendTheme({fonts, fontConfig, config});

export default function () {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <Auth />
      </AuthProvider>
    </NativeBaseProvider>
  );
}
