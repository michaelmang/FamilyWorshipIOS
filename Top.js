import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { StyleSheet, View } from 'react-native';

import Home from './scenes/Home';
import Login from './scenes/Login';
import Dashboard from './scenes/Dashboard';
import Signup from './scenes/Signup';
import FamilySignup from './scenes/FamilySignup';
import AddSession from './scenes/AddSession';
import Session from './scenes/Session';

export default class Top extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
            <Route exact path="/" component={Home}/>
            <Route path="/login" render={() => ( <Login store = {this.props.store}/> )}/>
            <Route path="/signup" render={() => ( <Signup store = {this.props.store}/> )}/>
            <Route path="/family-signup" render={() => ( <FamilySignup store = {this.props.store}/> )}/>
            <Route path="/dashboard" render={() => ( <Dashboard store = {this.props.store}/> )}/>
            <Route path="/add-session" render={() => ( <AddSession store = {this.props.store}/> )}/>
            <Route path="/session" render={() => ( <Session store = {this.props.store}/> )}/>
        </View>
      </NativeRouter>
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
