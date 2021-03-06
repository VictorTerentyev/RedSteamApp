import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import SteamApp from './SteamApp';

import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer, applyMiddleware(thunk));

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View styles={styles.main}>
        <Provider store={store}>
          <SteamApp />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {

  }
});

AppRegistry.registerComponent('RedSteamApp', () => App);