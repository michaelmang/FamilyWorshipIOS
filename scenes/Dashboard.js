import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Redirect } from 'react-router-native';
import { getState } from 'redux';
import axios from 'axios';

import SessionCard from '../components/SessionCard';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionsResponse: [],
      fontsLoaded: false,
      addSession: false
    };

    this.stateProps = this.props.store.getState();
    this.handleAddSession = this.handleAddSession.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'gentium-book-basic': require('../assets/fonts/GenBkBasR.ttf')
    });

    this.setState({ fontsLoaded: true });
    this.getSessions();
  }

  getSessions() {
    axios.get('https://family-worship.herokuapp.com/api/worship_sessions/user_sessions/' + this.stateProps.id)
      .then((response) => {
        this.setState({
          sessionsResponse: response.data.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleAddSession() {
    this.setState({ addSession: true });
  }

  render() {
    const sessionCards = this.state.sessionsResponse.map((session) =>
      <SessionCard
        key={session.id}
        book={session.book}
        chapter={session.chapter}
        date={session.date}
        time={session.time}
        store={this.props.store}
        id={session.id}
      />
    );
    return (
      <View style={styles.container}>
      {this.state.fontsLoaded ? (
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Text style={styles.title}>Family Worship</Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.button}>
              {this.state.addSession ? (
                  <Redirect to="/add-session"/>
              ) : (
                  <TouchableOpacity onPress={this.handleAddSession}>
                     <Text style={styles.buttonText}>Add Session</Text>
                  </TouchableOpacity>
                )
              }
            </View>
            <ScrollView>
            {sessionCards}
            </ScrollView>
          </View>
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
    backgroundColor: '#F5F7FA',
    width: "100%",
    height: "100%"
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "90%",
    backgroundColor: "transparent"
  },
  topBar: {
    width: "100%",
    height: "10%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "#DFCFAC",
    fontSize: 30,
    fontFamily: "gentium-book-basic",
    textAlign: "left",
    backgroundColor: 'transparent'
  },
  button: {
    padding: 10,
    marginTop: "30%",
    marginBottom: 20,
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
