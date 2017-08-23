import React from 'react';
import { View, StyleSheet } from 'react-native';

//Presentational React Component
class Loader extends React.Component {
  render() {
    return (
      <View className="box">
        <View className="cover">
          <View className="page-left">
            <View className="bars">
              <View className="bar" />
              <View className="bar" />
              <View className="bar" />
            </View>
          </View>
          <View className="page-right">
            <View className="bars">
              <View className="bar" />
              <View className="bar" />
              <View className="bar" />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // .box {
  //   position: relative;
  //   width: 600px;
  //   height: 400px;
  //   background: none;
  // }
  //
  // .cover {
  //   position: absolute;
  //   height: 50%;
  //   width: 50%;
  //   top: 25%;
  //   left: 25%;
  //   background: #DFCFAC;
  // }
  //
  // .page-left {
  //   position: absolute;
  //   height: 80%;
  //   width: 40%;
  //   top: 10%;
  //   left: 7.5%;
  //   background: white;
  // }
  //
  // .page-right{
  //   position: absolute;
  //   height: 80%;
  //   width: 40%;
  //   top: 10%;
  //   right: 7.5%;
  //   background: white;
  // }
  //
  // .bars {
  //   position: absolute;
  //   background: none;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  //   width: 100%;
  //   height: 100%;
  // }
  //
  // .bar {
  //   background: #DFCFAC;
  //   width: 75%;
  //   height: 15%;
  //   margin: 20px;
  //   animation: grow 1.1s infinite;
  // }
  //
  // @keyframes grow {
  //   0% {
  //     transform: scaleX(0);
  //     transform-origin: left;
  //   }
  //   75% {
  //     transform: scaleX(1.1);
  //     transform-origin: left;
  //   }
  //   100% {
  //     transform: scaleX(1);
  //     transform-origin: left;
  //   }
  // }
});

export default Loader
