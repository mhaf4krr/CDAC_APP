import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button } from "react-native-paper"

import * as FileSystem from 'expo-file-system';

export default class ImagePreview extends Component {

    state = {
        photo_uri: this.props.route.params.uri,
        coords: this.props.route.params.coords,
        internet: this.props.internet
    }

    handleImageUpload = async()=>{
        try {
            this.ensureFolderExists().then(async()=>{
                await FileSystem.copyAsync({
                    from:this.state.photo_uri,
                    to:`${FileSystem.documentDirectory}photos/something.jpg`
                })

                

                let result = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}photos`)
                console.log(result)
            })
        } catch (error) {
            
        }
    }
    
    ensureFolderExists () {
        const path = `${FileSystem.documentDirectory}photos`
        return FileSystem.getInfoAsync(path).then(({exists}) => {
          if (!exists) {
            return FileSystem.makeDirectoryAsync(path)
          } else {
            return Promise.resolve(true)
          }
        })
      }

    render() {
        console.log("Props:", this.props)
        return (
            <View style={styles["mainWrapper"]}>
                <View style={styles["imageWrapper"]}>
                    <Image style={styles["imageWrapper"]} source={{ uri: `${this.state.photo_uri}` }} />
                </View>
                <View style={{ justifyContent: "flex-start", alignItems: 'center' }}>
                    <Text style={{ marginBottom: 45 }}>Longitude: {this.state.coords["longitude"]} ||  Latitude:{this.state.coords["latitude"]} </Text>
                    <Button icon="camera" style={{ width: "60%", backgroundColor: "green", paddingVertical: 5 }} mode="contained" onPress={() => this.handleImageUpload()}>
                        UPLOAD
  </Button>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        position: 'relative',
        justifyContent: 'space-evenly',
        paddingVertical: 25,
        paddingBottom: 50
    },
    imageWrapper: {
        height: "90%",
        width: "95%",
        alignSelf: "center"
    }
})