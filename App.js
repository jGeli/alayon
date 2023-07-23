import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import StackNavigator from './src/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import PushController from './src/utils/PushController';

export default function App() {


  useEffect(() => {
    console.log('INIT APP')
  }, [])

  return (
    <Provider store={store}>
      <PushController />

      <StackNavigator />
    </Provider>
  );
}
