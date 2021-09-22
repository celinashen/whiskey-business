import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import AppCamera from './components/Camera'
import Scanner from './components/Scanner'


export default function App() {
  return (
    <View style={styles.container}>
      <Text style = {{marginTop: "20%"}}>
        WHISKEY BUSINESS
      </Text>
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

//key = AIzaSyAekpObrtDPPrvY6GKzt2RD9GjBPOPSdS4
