import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
var moment = require('moment');
import { Redirect } from 'react-router-native';
import { getState } from 'redux';
import { Font } from 'expo';
import axios from 'axios';

export default class AddSession extends React.Component {
  constructor(props) {
    super(props);

    this.date = moment().format('L');

    this.state = {
      fontLoaded: false,
      added: false,
      openDialog: false,
      books: [
        'Genesis',         'Exodus',          'Leviticus',     'Numbers',
        'Deuteronomy',     'Joshua',          'Judges',        'Ruth',
        '1 Samuel',        '2 Samuel',        '1 Kings',       '2 Kings',
        '1 Chronicles',    '2 Chronicles',    'Ezra',          'Nehemiah',
        'Esther',          'Job',             'Psalm',         'Proverbs',
        'Ecclesiastes',    'Song of Solomon', 'Isaiah',        'Jeremiah',
        'Lamentations',    'Ezekiel',         'Daniel',        'Hosea',
        'Joel',            'Amos',            'Obadiah',       'Jonah',
        'Micah',           'Nahum',           'Habakkuk',      'Zephaniah',
        'Haggai',          'Zechariah',       'Malachi',       'Matthew',
        'Mark',            'Luke',            'John',          'Acts',
        'Romans',          '1 Corinthians',   '2 Corinthians', 'Galatians',
        'Ephesians',       'Philippians',     'Colossians',    '1 Thessalonians',
        '2 Thessalonians', '1 Timothy',       '2 Timothy',     'Titus',
        'Philemon',        'Hebrews',         'James',         '1 Peter',
        '2 Peter',         '1 John',          '2 John',        '3 John',
        'Jude',            'Revelation'
      ],
      date: this.date,
      time: "",
      openingNotes: "",
      firstPsalm: "",
      book: "",
      chapters: [],
      chapter: "",
      messageNotes: "",
      secondPsalm: "",
      closingNotes: "",
      verses: "",
      sessionsResponse: []
    };

    this.stateProps = this.props.store.getState();

    this.handleSubmit = this.handleSubmit.bind(this);

    // this.handleTime = this.handleTime.bind(this);
    // this.handleOpeningNotes = this.handleOpeningNotes.bind(this);
    // this.handleFirstPsalm = this.handleFirstPsalm.bind(this);
    // this.handleBook = this.handleBook.bind(this);
    // this.handleChapter = this.handleChapter.bind(this);
    // this.handleMessageNotes =  this.handleMessageNotes.bind(this);
    // this.handleSecondPsalm = this.handleSecondPsalm.bind(this);
    // this.handleClosingNotes =  this.handleClosingNotes.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'gentium-book-basic': require('../assets/fonts/GenBkBasR.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  handleSubmit() {
    axios({
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: 'https://family-worship.herokuapp.com/api/worship_sessions',
      data: {
        worship_session: {
          date: this.state.date,
          time: this.state.time,
          openingNotes: this.state.openingNotes,
          firstPsalm: this.state.firstPsalm,
          book: this.state.book,
          chapter: this.state.chapter,
          verses: this.state.verses,
          messageNotes: this.state.messageNotes,
          secondPsalm: this.state.secondPsalm,
          closingNotes: this.state.closingNotes,
          user_id: this.stateProps.id
        }
      }
    })
    .then((response) => {
      this.setState({
        added: true
      });
    })
    .catch(e => {
      console.log(e);
    });
  }

  render() {
    const backgroundImg = "https://images.pexels.com/photos/159679/bible-job-reading-christianity-159679.jpeg?w=940&h=650&auto=compress&cs=tinysrgb";
    const minDate = moment().format('L');
    const maxDate = "12/31/2018";
    return (
      <View style={styles.container}>
      { this.state.added ? (
          <Redirect to="/dashboard"/>
        ) : (
          <View style={styles.container}>
            <Image source={{uri: backgroundImg}} style={styles.backgroundImg} />
            <View style={styles.overlay} />
            { this.state.fontLoaded ? (
                  <View style={styles.form}>
                    <Text style={styles.title}>Add Session</Text>
                    <DatePicker
                      style={{width: 200}}
                      date={this.state.date}
                      mode="date"
                      placeholder="Select date"
                      format="MM/DD/YYYY"
                      minDate={minDate}
                      maxDate={maxDate}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          marginLeft: 36
                        },
                        dateText: {
                          color: "#fff"
                        }
                      }}
                      onDateChange={(date) => {this.setState({date: date}, () => {console.log(this.state.date);} )}}
                    />
                    <View style={styles.button}>
                      <TouchableOpacity onPress={this.handleSubmit}>
                         <Text style={styles.buttonText}>Add</Text>
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
