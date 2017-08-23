import React from 'react';
import { StyleSheet, View, ScrollView, Text, TabBarIOS, TouchableOpacity } from 'react-native';
import { getState } from 'redux';
import { Redirect } from 'react-router-native';
import axios from 'axios';

import SessionCard from '../components/SessionCard';
import UpdateSession from '../actions/UpdateSession';

export default class Session extends React.Component {
  constructor(props) {
    super(props);

    this.stateProps = this.props.store.getState();

    this.state = {
      finished: false,
      fontsLoaded: false,
      headings: ["Notes", "Psalm", "Passage", "Notes", "Psalm", "Notes"],
      buttonText: ["First Psalm", "Passage", "Message", "Second Psalm", "Closing Prayer", "End Session"],
      index: 0,
      passage: "",
      firstPsalmRef: "",
      firstPsalmLyrics: "",
      firstPsalmNotes: "",
      secondPsalmRef: "",
      secondPsalmLyrics: "",
      secondPsalmNotes: "",
      openingNotes: "",
      messageNotes: "",
      closingNotes: "",
      book: "",
      chapter: ""
    }

    this.updateIndex = this.updateIndex.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'gentium-book-basic': require('../assets/fonts/GenBkBasR.ttf'),
      'Roboto': require('../assets/fonts/Roboto.ttf'),
      'Roboto_medium': require('../assets/fonts/Roboto-Medium.ttf')
    });

    this.setState({ fontsLoaded: true });
    this.getSessionInfo();
  }

  getSessionInfo() {
    axios.get('https://family-worship.herokuapp.com/api/worship_sessions/' + this.stateProps.sessionID)
      .then((response) => {
        const firstPsalm = response.data.data.firstPsalm;
        const secondPsalm = response.data.data.secondPsalm;
        const openingNotes = response.data.data.openingNotes;
        const messageNotes = response.data.data.messageNotes;
        const closingNotes = response.data.data.closingNotes;
        const book = response.data.data.book;
        const chapter = response.data.data.chapter;

        this.setState({
          openingNotes: openingNotes,
          messageNotes: messageNotes,
          closingNotes: closingNotes,
          book: book,
          chapter: chapter
        });

        const bookURL = "https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/" + book + ".json";

        axios.get(bookURL)
          .then((response) => {
            const verses = response.data.chapters[chapter - 1].verses;
            const prettyVerses = verses.map((verse, index) => {
              let tempVerse = index + 1;
              let prettyVerse = tempVerse.toString();
              let regexVerse = verse[index + 1]
                .replace(2019, "'");
              const returnString = prettyVerse + ": " + regexVerse + "";
              return(
                <Text key={index}>
                  {returnString}
                  {"\n"}{"\n"}
                </Text>
              );
            });
            this.setState({
              passage: prettyVerses
            });

            axios.get('https://family-worship.herokuapp.com/api/psalms/psalm/' + firstPsalm)
              .then((response) => {
                this.setState({
                  firstPsalmRef: response.data.data.psalm_ref,
                  firstPsalmLyrics: response.data.data.lyrics,
                  firstPsalmNotes: response.data.data.notes
                });

                axios.get('https://family-worship.herokuapp.com/api/psalms/psalm/' + secondPsalm)
                  .then((response) => {
                    this.setState({
                      secondPsalmRef: response.data.data.psalm_ref,
                      secondPsalmLyrics: response.data.data.lyrics,
                      secondPsalmNotes: response.data.data.notes
                    });
                  });
              });
          })
      });
  }

  updateIndex() {
    const index = this.state.index + 1;
    if(index < 6) {
      this.setState({
        index: index
      });
    } else {
      axios({
        method: 'delete',
        headers: {
          "Content-Type": "application/json",
        },
        url: 'https://family-worship.herokuapp.com/api/worship_sessions/' + this.stateProps.sessionID
      })
        .then((response) => {
          this.props.store.dispatch(UpdateSession(""));
          this.setState({
            finished: true
          });
        });
    }
  }

  render() {
    const buttonText = this.state.buttonText;
    const index = this.state.index;
    const headings = this.state.headings;
    const bodies = [
      this.state.openingNotes,
      this.state.firstPsalmLyrics,
      this.state.passage,
      this.state.messageNotes,
      this.state.secondPsalmLyrics,
      this.state.closingNotes
    ];
    return (
      <View style={styles.container}>
        {this.state.fontsLoaded ? (
          this.state.finished ? (
            <Redirect to="/dashboard"/>
          ) : (
            <View style={styles.container}>
              <ScrollView>
                {index !== 1 ? (
                    index === 4 ? (
                      <View style={styles.container}>
                        <Text style={styles.heading}>{headings[index]} {this.state.secondPsalmRef}</Text>
                        <Text style={styles.body}>{this.state.secondPsalmLyrics}</Text>
                        <Text style={styles.body}>{this.state.secondPsalmNotes}</Text>
                      </View>
                    ) : (
                      index === 2 ? (
                        <View style={styles.container}>
                          <Text style={styles.heading}>{this.state.book} {this.state.chapter}</Text>
                          <Text style={styles.body}>{bodies[index]}</Text>
                        </View>
                      ) : (
                        <View style={styles.container}>
                          <Text style={styles.heading}>{headings[index]}</Text>
                          <Text style={styles.body}>{bodies[index]}</Text>
                        </View>
                      )
                    )
                  ) : (
                    <View style={styles.container}>
                      <Text style={styles.heading}>{headings[index]} {this.state.firstPsalmRef}</Text>
                      <Text style={styles.body}>{this.state.firstPsalmLyrics}</Text>
                      <Text style={styles.body}>{this.state.firstPsalmNotes}</Text>
                    </View>
                  )
                }
              </ScrollView>
              <TouchableOpacity style={styles.button} onPress={this.updateIndex}>
                 <Text style={styles.buttonText}>{buttonText[index]} </Text>
              </TouchableOpacity>
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
    flex: 1,
    flexDirection: "column",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%",
    height: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F5F7FA'
  },
  heading: {
    color: "#DFCFAC",
    fontFamily: 'gentium-book-basic',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 15
  },
  body: {
    color: "#828982",
    fontFamily: 'Roboto',
    marginTop: 10,
    textAlign: "left",
    marginRight: "auto",
    marginBottom: 15,
    fontSize: 14
  },
  button: {
    padding: 10,
    marginTop: 20,
    marginBottom: 0,
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
