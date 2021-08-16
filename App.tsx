import React, { useEffect } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux'
import { NativeRouter } from 'react-router-native'

import store from './src/redux/store';
import Home from './src/pages/Home';


export default function App() {
  return (
      <Provider store={store}>
        <NativeRouter>
          <Home/>
        </NativeRouter>
      </Provider>
  );
}
