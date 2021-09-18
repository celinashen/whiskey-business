import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Camera } from 'expo-camera';
import { Dimensions } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera:{
        backgroundColor: "red",
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    }
  });




const AppCamera = () => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const dimensions = useRef(Dimensions.get("window"));
    const screenWidth = dimensions.current.width;
    const height = Math.round((screenWidth * 16) / 9);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    
    return (
        <Camera style={styles.camera} style = {{height: height, width: "100%"}} type={type} ratio = "16:9">
            <View style={styles.buttonContainer}>
                {/* <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setType(
                    type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                }}>
                <Text style={styles.text}> Flip </Text>
                </TouchableOpacity> */}
            </View>
        </Camera>
        );
  }

export default AppCamera