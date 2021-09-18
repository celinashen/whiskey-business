import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import AppCamera from './components/Camera'


export default function App() {
  return (
    <View style={styles.container}>
      <Text style = {{marginTop: "20%"}}>Whiskey Business app is live !!</Text>
      <AppCamera />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
