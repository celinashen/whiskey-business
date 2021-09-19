import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import React, { Component, useState, useEffect } from 'react';

// import Environment from '../firebase/environment';

import firebase from '../firebase/firebaseConfig';

import Scanner from './Scanner'

//import firebase from '../firebase/firebaseConfig';
// import { ref, getDownloadURL } from 'firebase/storage';

// import firebase from '../firebase/firebaseConfig'

import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

import { Button } from 'react-native-paper';



const uploadImage = async(uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  let result = makeid(10)
  console.log("makeID: ", result);
  var ref = firebase.storage().ref().child("uploads/" + result);

  ref.put(blob);
  // console.log("hello")
  return result;
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

    const storage = firebase.storage();
    
    const [photoId, setPhotoId] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    // const storage = getStorage();
    // const snapshotRef = ref(storage, photo);
    // const snapshotRemoteRef = ref(storage, photo);
    // const uploadTask = uploadBytesResumable(storageRef, file);
  
    useEffect(() => {
      setPhotoId(uploadImage(photo.uri))
    }, [photo]);

    // console.log('sdsfds', photo)

    


    async function submitToGoogle(photo) {
      try {
        console.log("photo id: ", photoId._W)

        storage.ref('uploads/' + photoId._W).getDownloadURL()
        .then((url) => {
          // console.log("URL: ", url)
          setPhotoURL(url)
        })

        console.log("PHOTOURL: ", photoURL)

        // var ref = storage.ref().child("uploads/" + photoId._W);
        // console.log()
        // ref.getDownloadURL().then((url) => console.log("url: ",))
        let body = JSON.stringify({
          requests: [
            {
              features: [
                { type: "LOGO_DETECTION", maxResults: 5 },
              ],
              image: {
                // content: photoURL
                source: {
                  imageUri: photoURL
                }
              }
            }
          ]
        });
        let response = await fetch(
          'https://vision.googleapis.com/v1/images:annotate?key=' + 'AIzaSyAekpObrtDPPrvY6GKzt2RD9GjBPOPSdS4',
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: body
          }
        );
        let responseJson = await response.json();
        console.log("response:", responseJson);
        // this.setState({
        // 	googleResponse: responseJson,
        // 	uploading: false
        // });
      } catch (error) {
        console.log(error);
      }
    };

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
          <Button
            style={{ marginBottom: 10 }}
            onPress={() => submitToGoogle(photo)}
            title="Analyze!"
          />
      </View>
    )
  }

export default CameraPreview;