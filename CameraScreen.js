import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, PermissionsAndroid, Platform, Image, StyleSheet, Alert } from 'react-native';

import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const cameraRef = useRef(null);
  const [takenPhotoUri, setTakenPhotoUri] = useState(null);
  const navigation = useNavigation();
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
    // Set a timeout to navigate if the camera isn't ready
    const cameraTimeout = setTimeout(() => {
      if (!cameraReady) {
        Alert.alert("Camera Error", "Camera initialisation taking too long.");
        navigation.navigate('ChatScreen', { message: 'Camera initialisation failed.' });
      }
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(cameraTimeout);
  }, [cameraReady, navigation]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission denied");
        navigation.navigate('ChatScreen');
      }
    } catch (err) {
      console.warn(err);
      navigation.navigate('ChatScreen');
    }
  };

  const onCameraReady = () => {
    setCameraReady(true); // Camera is ready
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      try {
        const data = await cameraRef.current.takePictureAsync(options);
        console.log(data.uri);
        setTakenPhotoUri(data.uri); // Save the taken photo's URI
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to take picture.");
      }
    }
  };

  const handleUsePicture = () => {
    if (takePicture) {
      navigation.navigate('ChatScreen', { photoUri: takenPhotoUri });
    } else {
      navigation.navigate('ChatScreen', { message: 'No picture taken.' });
    }
  };

  // Function to reset the taken photo URI and return to camera view
  const retakePicture = () => {
    setTakenPhotoUri(null);
  };

  // Include onCameraReady prop in RNCamera
  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        onCameraReady={onCameraReady}
        onStatusChange={({ cameraStatus }) => {
          if (cameraStatus !== 'READY') {
            Alert.alert("Camera Error", "There was an issue with the camera.");
            navigation.navigate('ChatScreen');
          }
        }}
      >
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={takePicture} style={styles.button}>
            <Text style={styles.buttonText}>SNAP</Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#202124',
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#ea80fc',
  }
});

export default CameraScreen;
