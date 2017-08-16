import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import FamilyWorshipApp from './reducers/FamilyWorshipApp';

import Top from './Top';

//intialize store
let store = createStore(
  FamilyWorshipApp
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store = {store}>
        <Top store = {store} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%"
  },
});
