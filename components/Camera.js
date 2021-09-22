import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Camera } from 'expo-camera';
import { Dimensions } from "react-native";

import { Button } from 'react-native-paper';

import { takePictureAsync } from 'expo-camera'

import CameraPreview from './CameraPreview'


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
    const [cameraRef, setCameraRef] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    const dimensions = useRef(Dimensions.get("window"));
    const screenWidth = dimensions.current.width;
    const height = Math.round((screenWidth * 16) / 12);

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

    const takePicture = async () => {
        console.log("take pic")
        if (cameraRef) {
            const options = {quality: 1, base64: true};
            // const data = await takePictureAsync(options);
            let photo = await cameraRef.takePictureAsync();
            console.log("reached here")
            setPreviewVisible(true)
            setCapturedImage(photo)
            // console.log(data);
            console.log("set photo")
        }
    };

    
    return (
        
        <View
        style={{
            flexDirection: 'column',
            padding: 20,
        }}>
            { previewVisible && capturedImage ? 
            ( 
            <View style = {{height: height, width: screenWidth}} >
                <CameraPreview photo={capturedImage} />
                <Button backgroundColor = "red"/>
            </View>
                
            
            ): 
            (
                <View>
                    <View>
                        <Camera 
                        style={styles.camera} 
                        style = {{height: height, width: screenWidth}} 
                        type={type} 
                        ratio = "8:3"
                        ref={ref => {
                            setCameraRef(ref);
                        }}
                        autoFocus="on"
                        />
                    </View>

                    <View>
                        <Button mode="contained" onPress={() =>{
                            console.log("hello")
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                                );
                        }}>
                            Flip
                        </Button>

                        <Button mode="contained" style = {{ marginTop: "1%"}} onPress={() => takePicture()} >
                            snapshot
                        </Button>
                    </View>
                </View>
            )}
        

        </View>
        );
  }

export default AppCamera



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