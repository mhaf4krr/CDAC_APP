import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from "react-native-paper"

import { Camera } from 'expo-camera';

export default function CameraComponent(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  let locaiton = props.route.params.location

  let snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      // props.navigation.navigate("Image Preview", {
      //   image: photo["uri"]
      // })

      props.navigation.navigate("Image Preview",{...photo,...locaiton})
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    return () => {
      this.camera = null
    }
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref => {
        this.camera = ref;
      }} >
        <View style={{ justifyContent: 'flex-end' }}>

          <Button icon="camera" style={{
            width: "35%",
            paddingVertical: 5,
            alignSelf: "center",
            marginVertical: 30,
            backgroundColor: "orange"
          }} mode="contained" onPress={() => snap()}>
            CAPTURE
  </Button>

        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  text: {
    fontSize: 18,
    color: 'white',
  },
});
