import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { Appbar ,Paragraph} from "react-native-paper"

import AsyncStorage from "@react-native-async-storage/async-storage"



import Project from "../components/localProjectDisplay"

export default class Local extends Component {

    state={
        dataLoaded:false,
        local_uploads:[],
        unsubscribe:null
    }

   
    
    getLocalPhotos = async() =>{
        let empty 
       
        let local_photos_data = await AsyncStorage.getItem("local_photo")
        if(local_photos_data === null) {
            local_photos_data = []
            empty = true
           
        }
        else {
            local_photos_data = JSON.parse(local_photos_data)
        empty = false
        }

        
       
        this.setState({
            local_uploads:local_photos_data,
            dataLoaded:true,
            isEmpty:empty
        })

       
    }

   async componentDidMount(){
        try {
            const unsubscribe = this.props.navigation.addListener('focus', async() => {
                // The screen is focused
                // Call any action
                if(this.state.unsubscribe === null){
                    this.setState({
                        unsubscribe:unsubscribe
                    })
                }

                console.log("This screen is fouced")
                this.getLocalPhotos()
              });
           
        } catch (error) {
            console.error(error)
        }
    }


    async componentWillUnmount(){
       await this.state.unsubscribe()
    }

    render() {
        return (
            <View style={{flex:1,position:"relative"}}>
                <Appbar.Header style={{backgroundColor:"#4287f5"}}>
                    <Appbar.Content title="Local Uploads"  />
                </Appbar.Header>
                
                {this.state.dataLoaded?(
                    <ScrollView>
                        { this.state["isEmpty"] ?(
                            <View style={{alignSelf:'center',marginTop:20}}>
                                <Text> Local Storage is Empty </Text>
                            </View>
                        ):(<View>
                            <Paragraph style={{width:"90%",alignSelf:"center",marginTop:15}}>
                        Below is list of uploads which could not be uploaded to server, but have been saved locally for synchronization
                    </Paragraph>
                            {this.state.local_uploads.map((upload)=>{
                                return <Project key={`${upload["dated"]}_${upload["photo_id"]}`} data={upload} />
                            })}
                        </View>
                        )}
    
    
                    </ScrollView>
                ):(
                    <View>
                      <Text>Please Wait, accessing Local Storage</Text>
                    </View>
                )}
            </View>
        )
    }
}
