import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import React, {Component} from 'react';


import firebase from '../firebase/firebaseConfig';

//import firebase from '../firebase/firebaseConfig';
// import { ref, getDownloadURL } from 'firebase/storage';

// import firebase from '../firebase/firebaseConfig'

import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

const uploadImage = async(uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase.storage().ref().child("uploads/" + makeid(10));
  return ref.put(blob);
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  return result;
}

const CameraPreview = ({photo}) => {
    console.log('sdsfds', photo)

    // const storage = getStorage();
    // const snapshotRef = ref(storage, photo);
    // const snapshotRemoteRef = ref(storage, photo);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    uploadImage(photo.uri)

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