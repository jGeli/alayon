import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import StackNavigator from './src/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import PushController from './src/utils/PushController';
import GeneralStatusBarColor from './src/components/Styles/GeneralStatusBarColor';
import { COLORS } from './src/constants';

export default function App() {


  useEffect(() => {
    console.log('INIT APP')
  })

  return (
    <Provider store={store}>
      <GeneralStatusBarColor backgroundColor={COLORS.primary}
        barStyle="light-content" />
      <PushController />

      <StackNavigator />
    </Provider>
  );
}
