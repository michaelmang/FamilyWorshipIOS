import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { Font } from 'expo';

export default class Home extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {

    await Font.loadAsync({
      'gentium-book-basic': require('../assets/fonts/GenBkBasR.ttf'),
      'Roboto': require('../assets/fonts/Roboto.ttf'),
      'Roboto_medium': require('../assets/fonts/Roboto-Medium.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const backgroundImg = "https://images.pexels.com/photos/272337/pexels-photo-272337.jpeg?w=940&h=650&auto=compress&cs=tinysrgb";
    return (
      <View style={styles.container}>
          <Image source={{uri: backgroundImg}} style={styles.backgroundImg} />
          <View style={styles.overlay} />
          {
            this.state.fontLoaded ? (
              <View>
                <Text style={styles.title}>Family Worship</Text>
                 <TouchableOpacity style={styles.signUpButtonContainer}>
                  <Link to="signup">
                   <Text style={styles.signUpButton}>Create a Free Account</Text>
                  </Link>
                 </TouchableOpacity>
                 
                 <TouchableOpacity style={styles.loginButtonContainer}>
                  <Link to="login">
                    <Text style={styles.loginButton}>Login to Your Account</Text>
                   </Link>
                 </TouchableOpacity>
              </View>
            ) : null
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
    fontSize: 50,
    fontFamily: "gentium-book-basic",
    textAlign: "center",
    backgroundColor: 'transparent'
  },
  signUpButtonContainer: {
    margin: 10,
    padding: 12,
    marginTop: 25,
    borderRadius: 30,
    backgroundColor: "#F89D79"
  },
  loginButtonContainer: {
    margin: 10,
    padding: 12,
    borderRadius: 30,
    backgroundColor: "#FFF"
  },
  signUpButton: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "gentium-book-basic",
    textAlign: "center",
    backgroundColor: 'transparent'
  },
  loginButton: {
    color: "#F89D79",
    fontSize: 18,
    fontFamily: "gentium-book-basic",
    textAlign: "center",
    backgroundColor: 'transparent'
  }
});
