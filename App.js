import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import StackNavigator from './src/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {


  useEffect(() => {
    console.log('INIT APP')
  }, [])

  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}
