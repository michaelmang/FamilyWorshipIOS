import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Redirect } from 'react-router-native';
import { Font } from 'expo';
import { getState } from 'redux';
import axios from 'axios';

import StoreFamilyId from '../actions/StoreFamilyId';

export default class FamilySignup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      name: "",
      submitted: false
    }

    this.stateProps = this.props.store.getState();

    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'gentium-book-basic': require('../assets/fonts/GenBkBasR.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  handleName(text) {
    this.setState({
      name: text
    })
  }

  handleSubmit (event) {
    axios({
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      url: 'https://family-worship.herokuapp.com/api/families',
      data: {
        family: {
          name: this.state.name,
          user_id: this.stateProps.id
        }
      }
    })
      .then((response) => {
        this.props.store.dispatch(StoreFamilyId(response.data.data.id));
        this.setState({ submitted: true })
      });
  }

  render() {
    const backgroundImg = "https://images.pexels.com/photos/130111/pexels-photo-130111.jpeg?w=940&h=650&auto=compress&cs=tinysrgb";
    return (
      <View style={styles.container}>
      { this.state.submitted ? (
          <Redirect to="/dashboard"/>
        ) : (
          <View style={styles.container}>
            <Image source={{uri: backgroundImg}} style={styles.backgroundImg} />
            <View style={styles.overlay} />
            { this.state.fontLoaded ? (
                  <View style={styles.form}>
                    <Text style={styles.title}>Enter Family Information</Text>
                    <TextInput
                      placeholder="Enter family name"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      style={styles.textInput}
                      onChangeText={this.handleName}
                      value={this.state.name}
                    />
                    <View style={styles.button}>
                      <TouchableOpacity onPress={this.handleSubmit}>
                         <Text style={styles.buttonText}>Proceed to Dashboard</Text>
                      </TouchableOpacity>
                    </View>
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
