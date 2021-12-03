import * as React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export default function () {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Admin Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
