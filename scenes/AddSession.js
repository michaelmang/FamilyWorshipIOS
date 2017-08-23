import React from 'react';
import { Keyboard, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, Picker, Alert } from 'react-native';
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
    this.time = moment().format('hh:mm a');

    this.state = {
      fontLoaded: false,
      added: false,
      openDialog: false,
      books: [
        'Genesis',         'Exodus',          'Leviticus',     'Numbers',
        'Deuteronomy',     'Joshua',          'Judges',        'Ruth',
        '1 Samuel',        '2 Samuel',        '1 Kings',       '2 Kings',
        '1 Chronicles',    '2 Chronicles',    'Ezra',          'Nehemiah',
        'Esther',          'Job',             'Psalms',         'Proverbs',
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
      time: this.time,
      openingNotes: "",
      firstPsalm: "1",
      book: "Genesis",
      chapters: [],
      chapter: "1",
      messageNotes: "",
      secondPsalm: "1",
      closingNotes: "",
      verses: "",
      sessionsResponse: []
    };

    this.stateProps = this.props.store.getState();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBook = this.handleBook.bind(this);
    this.handleChapter = this.handleChapter.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

  }

  async componentDidMount() {
    await Font.loadAsync({
      'gentium-book-basic': require('../assets/fonts/GenBkBasR.ttf'),
      'Roboto': require('../assets/fonts/Roboto.ttf'),
      'Roboto_medium': require('../assets/fonts/Roboto-Medium.ttf')
    });

    this.setState({ fontLoaded: true }, () => {
      const bookURL = "https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/Genesis.json";
      axios.get(bookURL)
        .then((response) => {
          const verses = response.data.chapters[this.state.chapter - 1].verses.length;
          const length = response.data.chapters.length;
          let chapters = [];
          for(let i = 0; i < length; i++) {
            let num = i + 1;
            let numPush = num.toString();
            chapters.push(numPush)
          }
          this.setState({
            chapters: chapters,
            verses: verses
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  handleBook(itemValue, itemIndex) {
    const text = itemValue.replace(/\s+/g, '');
    this.setState({
      book: text
    }, () => {
      const bookURL = "https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/" + this.state.book + ".json";
      axios.get(bookURL)
        .then((response) => {
          const length = response.data.chapters.length;
          let chapters = [];
          for(let i = 0; i < length; i++) {
            let num = i + 1;
            let numPush = num.toString();
            chapters.push(numPush)
          }
          this.setState({
            chapters: chapters
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  handleChapter(itemValue, itemIndex) {
    this.setState({
      chapter: itemValue
    }, () => {
      const bookURL = "https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/" + this.state.book + ".json";
      axios.get(bookURL)
        .then((response) => {
          const verses = response.data.chapters[this.state.chapter - 1].verses.length;
          this.setState({
            verses: verses
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
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
      Alert.alert("Session creation failed. Please check your fields.");
    });
  }

  onKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
    }
  };

  render() {
    const backgroundImg = "https://images.pexels.com/photos/159679/bible-job-reading-christianity-159679.jpeg?w=940&h=650&auto=compress&cs=tinysrgb";
    const minDate = moment().format('L');

    let psalms = [];

    for (let i = 0; i < 150; i++) {
      let num = i + 1;
      let numString = num.toString();
      psalms.push(numString);
    }

    const psalmPickerItems = psalms.map((psalm, index) => {
      let value = index + 1;
      return (
        <Picker.Item key={index} label={"Psalm " + psalm} value={value.toString()} />
      )
    })

    const bookPickerItems = this.state.books.map((book, index) => {
      return (
        <Picker.Item key={index} label={book} value={book} />
      )
    })

    const chapterPickerItems = this.state.chapters.map((chapter, index) => {
      return (
        <Picker.Item key={index} label={chapter.toString()} value={chapter.toString()} />
      )
    })

    return (
      <View style={styles.container}>
      { this.state.added ? (
          <Redirect to="/dashboard"/>
        ) : (
          <View style={styles.container}>
            <Image source={{uri: backgroundImg}} style={styles.backgroundImg} />
            <View style={styles.overlay} />
            { this.state.fontLoaded ? (
                  <ScrollView style={{width: "100%"}}>
                  <View
                    style={styles.form}
                  >
                    <Text style={styles.title}>Add Session</Text>
                    <Text style={styles.label}>Date</Text>
                    <DatePicker
                      style={{width: "100%", marginBottom: 5}}
                      date={this.state.date}
                      mode="date"
                      placeholder="Select date"
                      format="MM/DD/YYYY"
                      minDate={minDate}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          display: "none"
                        },
                        dateInput: {
                          marginLeft: 0,
                          padding: 10,
                          backgroundColor: "rgba(10, 22, 31, 0.7)",
                          borderWidth: 0
                        },
                        dateText: {
                          color: "rgba(255, 255, 255, 0.7)",
                          marginRight: "auto"
                        }
                      }}
                      onDateChange={(date) => {this.setState({date: date})}}
                    />
                    <Text style={styles.label}>Time</Text>
                    <DatePicker
                      style={{width: "100%", marginBottom: 5}}
                      date={this.state.time}
                      mode="time"
                      format="hh:mm a"
                      is24Hour={false}
                      placeholder="Select time"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          display: "none"
                        },
                        dateInput: {
                          marginLeft: 0,
                          padding: 10,
                          backgroundColor: "rgba(10, 22, 31, 0.7)",
                          borderWidth: 0
                        },
                        dateText: {
                          color: "rgba(255, 255, 255, 0.7)",
                          marginRight: "auto"
                        }
                      }}
                      onDateChange={(date) => { this.setState({time: date} )}}
                    />
                    <Text style={styles.label}>Opening Prayer Notes</Text>
                    <TextInput
                      placeholder="Type as much as you want"
                      multiLine={true}
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      style={styles.textInput}
                      onChangeText={(text) => { this.setState({openingNotes: text} )}}
                      value={this.state.openingNotes}
                      returnKeyType={'done'}
                      onKeyPress={this.onKeyPress}
                    />
                    <Text style={styles.label}>First Psalm</Text>
                    <Picker
                      style={{
                        width: "100%",
                        height: 180,
                        marginBottom: 5
                      }}
                      itemStyle={{
                        color: 'white',
                        fontSize: 14,
                      }}
                      selectedValue={this.state.firstPsalm}
                      onValueChange={(itemValue, itemIndex) => this.setState({firstPsalm: itemValue})}>
                      {psalmPickerItems}
                    </Picker>
                    <Text style={styles.label}>Book</Text>
                    <Picker
                      style={{
                        width: "100%",
                        height: 180,
                        marginBottom: 5
                      }}
                      itemStyle={{
                        color: 'white',
                        fontSize: 14,
                      }}
                      selectedValue={this.state.book}
                      onValueChange={this.handleBook}>
                      {bookPickerItems}
                    </Picker>
                    <Text style={styles.label}>Chapter</Text>
                    <Picker
                      style={{
                        width: "100%",
                        height: 180,
                        marginBottom: 5
                      }}
                      itemStyle={{
                        color: 'white',
                        fontSize: 14,
                      }}
                      selectedValue={this.state.chapter}
                      onValueChange={this.handleChapter}>
                      {chapterPickerItems}
                    </Picker>
                    <Text style={styles.label}>Message Notes</Text>
                    <TextInput
                      placeholder="Type as much as you want"
                      multiLine={true}
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      style={styles.textInput}
                      onChangeText={(text) => { this.setState({messageNotes: text} )}}
                      value={this.state.messageNotes}
                      returnKeyType={'done'}
                      onKeyPress={this.onKeyPress}
                    />
                    <Text style={styles.label}>Second Psalm</Text>
                    <Picker
                      style={{
                        width: "100%",
                        height: 180,
                        marginBottom: 5
                      }}
                      itemStyle={{
                        color: 'white',
                        fontSize: 14,
                      }}
                      selectedValue={this.state.secondPsalm}
                      onValueChange={(itemValue, itemIndex) => this.setState({secondPsalm: itemValue})}>
                      {psalmPickerItems}
                    </Picker>
                    <Text style={styles.label}>Closing Prayer Notes</Text>
                    <TextInput
                      placeholder="Type as much as you want"
                      multiLine={true}
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      style={styles.textInput}
                      onChangeText={(text) => { this.setState({closingNotes: text} )}}
                      value={this.state.closingNotes}
                      returnKeyType={'done'}
                      onKeyPress={this.onKeyPress}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                       <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                  </ScrollView>
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
    padding: 20,
    paddingTop: 35,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%"
  },
  textInput: {
    height: 40,
    width: "100%",
    marginTop: 5,
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
  },
  label: {
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: 'Roboto',
    textAlign: "left",
    marginBottom: 5,
    marginTop: 5,
    fontSize: 16
  }
});
