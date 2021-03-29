import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Alert } from 'react-native'
import { ActivityIndicator, Button } from "react-native-paper"

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalContext from "../context/GlobalContext"

import * as FileSystem from 'expo-file-system';

export default class ImagePreview extends Component {



    static contextType = GlobalContext


    state = {
        photo_uri: this.props.route.params.photo.uri,
        photo_base64: this.props.route.params.photo["base64"],
        coords: this.props.route.params.location.coords,
       

        component_id: "123",
        project_id: "PROJ123",
        project_title:"PRO_TITLE",
        btnDisabled: false,
        showOverlay:false,
        isLoading: false

    }

    showOverlay=(state)=>{
        this.setState({
            showOverlay:state
        })
    }

    isLoading = (state) =>{
        this.setState({
            isLoading:state
        })
    }

    isInternetAvailable = () =>{


       
        return this.context["internet"]["status"]

     
    }


    storeUploadLocally = async() =>{

        try {
            let photo_id = Date.now()
        //Copy Image to Application Folder for reference
        
        await FileSystem.copyAsync({
            from:this.state["photo_uri"],
            to:`${FileSystem.documentDirectory}images/${photo_id}.jpg`
        })

        let data = await AsyncStorage.getItem("local_photo")
        if(data === null) {
            data = []
        }
        else data = JSON.parse(data)

        console.log(data)
        let latestData = JSON.stringify([...data,{
            photo_id:photo_id,
            type:"local_photo",
            coords:this.state["coords"],
            project_title:this.state["project_title"],
            project_id:this.state["project_id"],
            dated:new Date().toLocaleDateString()

        }])

        console.log(JSON.parse(latestData))

        await AsyncStorage.setItem("local_photo",latestData)
        } catch (error) {
            console.log(error)
        }
    }




    handleImageUpload = async () =>{



        let formBody={
            photo:this.state["photo_base64"],
            coords:this.state["coords"],
            photo_label:Date.now()
        }
        if(this.isInternetAvailable()){
              /* Internet Available Block */
            try {
                let res = await fetch("http://192.168.43.86:3000/new",{
                    method:"POST",
                    body:JSON.stringify(formBody),
                    headers:new Headers({
                        'Content-Type':"application/json"
                    })
                })
                
                if(res.status === 200){
                    this.isLoading(false)

                    Alert.alert("Photo Uploaded",
                    "Photo has been successfully uploaded over server with location coordinates",
                    [
                        {
                            text: "Acknowledged",
                            onPress: () => {
                            this.props.navigation.popToTop()
                            },
                           
                          },
                    ])
                }

                else {
                    Alert.alert("Error Occured at Server",
                    "Some Error has occured at Server and responded with NOT OK",
                    [
                        {
                            text: "Acknowledged",
                            onPress: () => {
                                //Store the data Locally and Fall to Main Screen
                               
                               this.props.navigation.popToTop()
                            },
                           
                          },
                    ])
                }
                

            } catch (error) {
                console.log(error)
            }   
        }
        else {

            /* Internet Not Available Block */

            

            Alert.alert("No Internet Available",
                    "No Internet was available, saving data locally.",
                    [
                        {
                            text: "Acknowledged",
                            onPress:async () => {
                                //Store the data Locally and Fall to Main Screen
                                await this.storeUploadLocally(formBody)
                               this.props.navigation.popToTop()
                            },
                           
                          },
                    ])

        }
    }


    render() {

        
        
        return (
           

           
            <View style={styles["mainWrapper"]}>
               
                {!this.state.showOverlay?(
                    <View style={styles["mainWrapper"]}>
                    <View style={styles["imageWrapper"]}>
                        <Image style={styles["imageWrapper"]} source={{ uri: `${this.state.photo_uri}` }} />
                    </View>
                    <View style={{ justifyContent: "flex-start", alignItems: 'center' }}>
                        <Text style={{ marginVertical: 15 }}>Longitude: {this.state.coords["longitude"]} ||  Latitude:{this.state.coords["latitude"]} </Text>
                        <Text style={{ marginBottom: 30 }}> Place: API NEEDED FOR REVERSE GEOENCODING </Text>
                        <Button icon="camera" disabled={this.state["btnDisabled"]} style={{ width: "60%", backgroundColor: "green", paddingVertical: 5 }} mode="contained" onPress={() => {
                            //this.uploadInfoServer()
                            this.setState({
                                btnDisabled: true
                            })

                            this.showOverlay(true)
                            this.isLoading(true)

                            this.handleImageUpload()
                        }}>
                            UPLOAD</Button>
                    </View>
                    </View>
                ):(<View style={{flex:1}}>
                    <ActivityIndicator  animating={this.state.isLoading} size={60} color="green" />
                    <View style={{width:"80%",alignSelf:"center",marginTop:35}}><Text style={{textAlign:"center"}} >Uploading Photograph, Please Wait</Text></View>
                </View>)}
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