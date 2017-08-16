import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Redirect } from 'react-router-native';

import UpdateSession from '../actions/UpdateSession';

export default class SessionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontsLoaded: false,
      sessionStarted: false
    };

    this.handleStartSession = this.handleStartSession.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('../assets/fonts/Roboto.ttf'),
      'Roboto_medium': require('../assets/fonts/Roboto-Medium.ttf')
    });

    this.setState({ fontsLoaded: true });
  }

  handleStartSession() {
    this.props.store.dispatch(UpdateSession(this.props.id));
    this.setState({
      sessionStarted: true
    });
  }

  render() {
    const cardImage = "https://images.pexels.com/photos/267709/pexels-photo-267709.jpeg?w=940&h=650&auto=compress&cs=tinysrgb";
    const cardTitle = this.props.book + " " + this.props.chapter;
    const cardTime = this.props.date + " | " + this.props.time;
    return (
      <View style={styles.container}>
      {this.state.fontsLoaded ? (
          this.state.sessionStarted ? (
              <Redirect to="session" />
            ) : (
              <View style={styles.cardContainer}>
                <Text style={styles.heading}>{cardTitle}</Text>
                <Image style={{height: 100, width: "100%", marginBottom: 15}} source={{uri: cardImage}}/>
                <View style={styles.captionContainer}>
                  <TouchableOpacity onPress={this.handleStartSession}>
                    <Text style={styles.actionText}>Start Session</Text>
                  </TouchableOpacity>
                  <Text style={styles.subheading}>{cardTime}</Text>
                </View>
              </View>
            )
        ) : null
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 175
  },
  cardContainer: {
    height: "100%",
    width: "100%",
    padding: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#FFF"
  },
  captionContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  heading: {
    color: "#828982",
    fontFamily: "Roboto_medium",
    backgroundColor: "transparent",
    fontSize: 16,
    marginBottom: 5
  },
  actionText: {
    color: "#F89D79",
    fontFamily: "Roboto_medium",
    backgroundColor: "transparent",
    fontSize: 16,
    marginBottom: 5
  },
  subheading: {
    color: "#828982",
    fontFamily: "Roboto",
    fontSize: 14,
    opacity: 0.75,
    marginLeft: "auto",
    backgroundColor: "transparent"
  }
});
