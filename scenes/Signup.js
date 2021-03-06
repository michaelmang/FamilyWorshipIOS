import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Link, Redirect } from 'react-router-native';
import { Font } from 'expo';
import { getState } from 'redux';
import axios from 'axios';

import AuthenticateUser from '../actions/AuthenticateUser';
import StoreId from '../actions/StoreId';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      email: "",
      password: "",
      authenticated: false
    }

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'gentium-book-basic': require('../assets/fonts/GenBkBasR.ttf'),
      'Roboto': require('../assets/fonts/Roboto.ttf'),
      'Roboto_medium': require('../assets/fonts/Roboto-Medium.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  handleEmail(text) {
    this.setState({
      email: text
    })
  }

  handlePassword(text) {
    this.setState({
      password: text
    })
  }

  handleSubmit() {
    axios({
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: 'https://family-worship.herokuapp.com/api/users',
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }
    })
    .then((response) => {
      if(response.data.meta.token !== "") {
        this.props.store.dispatch(StoreId(response.data.data.id));
        this.props.store.dispatch(AuthenticateUser());
        this.setState({
          authenticated: true
        });
      }
    })
    .catch(e => {
      Alert.alert("Signup failed. Try again.");
    });
  }

  render() {
    const backgroundImg = "https://images.pexels.com/photos/377058/pexels-photo-377058.jpeg?w=940&h=650&auto=compress&cs=tinysrgb";
    return (
      <View style={styles.container}>
      { this.state.authenticated ? (
          <Redirect to="/family-signup"/>
        ) : (
          <View style={styles.container}>
            <Image source={{uri: backgroundImg}} style={styles.backgroundImg} />
            <View style={styles.overlay} />
            { this.state.fontLoaded ? (
                  <View style={styles.form}>
                    <Text style={styles.title}>Create Your Account</Text>
                    <TextInput
                      autoCapitalize="none"
                      placeholder="Enter email"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      keyboardType='email-address'
                      style={styles.textInput}
                      onChangeText={this.handleEmail}
                      value={this.state.email}
                    />
                    <TextInput
                      autoCapitalize="none"
                      placeholder="Enter password"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      secureTextEntry={true}
                      style={styles.textInput}
                      onChangeText={this.handlePassword}
                      value={this.state.password}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                       <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                  </View>
                ) : null
            }
          </View>
        )
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(26, 55, 79, 0.8)',
    width: "100%",
    height: "100%"
  },
  backgroundImg: {
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(26, 55, 79, 0.8)',
  },
  title: {
    color: "#DFCFAC",
    fontSize: 30,
    fontFamily: "gentium-book-basic",
    marginBottom: 10,
    textAlign: "left",
    backgroundColor: 'transparent'
  },
  form: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: "100%",
    padding: 20
  },
  textInput: {
    height: 40,
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "rgba(10, 22, 31, 0.7)",
    color: "rgba(255, 255, 255, 0.7)"
  },
  button: {
    padding: 10,
    marginTop: 25,
    width: "100%",
    backgroundColor: "#F89D79"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "gentium-book-basic",
    textAlign: "center",
    backgroundColor: 'transparent'
  }
});
