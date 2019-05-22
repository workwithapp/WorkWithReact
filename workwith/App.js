import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { AppNav } from './nav/appNav';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  
  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return   <AppNav />;
  	
  }
}
