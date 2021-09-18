import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import React, {Component} from 'react';

const CameraPreview = ({photo}) => {
    console.log('sdsfds', photo)
    return (
      <View
        style={{
          backgroundColor: 'red',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1
          }}
        />
      </View>
    )
  }

export default CameraPreview;