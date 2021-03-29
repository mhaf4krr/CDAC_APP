import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { Button, Divider, Paragraph } from 'react-native-paper'


import GlobalContext from "../context/GlobalContext"



import * as FileSystem from "expo-file-system"

export default class localProjectDisplay extends Component {

    static contextType = GlobalContext

    state = {
        ...this.props.data,
        photo_local_url: `${FileSystem.documentDirectory}images/${this.props.data["photo_id"]}.jpg`
    }



    render() {



        return (

            <View style={{ backgroundColor: "white", paddingVertical: 25, paddingHorizontal: 15, marginVertical: 25,width:"92%",alignSelf:"center",borderRadius:10,borderColor:"#77a7e6",borderWidth:1 }}>
                <Text>DATED : {this.state["dated"]}</Text>

                <Image style={{ height: 250, marginVertical: 10, borderRadius: 5 }} source={{ uri: `${this.state["photo_local_url"]}` }} />
                <View style={{

                }}>

                    <View style={styles["row"]}>
                        <Paragraph>
                            Project DEscription
                        </Paragraph>
                    </View>
                    <View style={styles["row"]}>
                        <Text>PROJECT ID</Text>
                        <Text>{this.state["project_id"]}</Text>
                    </View>

                    <View style={styles["row"]}>
                        <Text>LATITIUDE</Text>
                        <Text>{this.state["coords"]["latitude"]}</Text>
                    </View>

                    <View style={styles["row"]}>
                        <Text>LONGITUDE</Text>
                        <Text>{this.state["coords"]["longitude"]}</Text>
                    </View>

                    <View style={styles["row"]}>
                        <Text>PHOTO ID</Text>
                        <Text>{this.state["photo_id"]}</Text>
                    </View>

                   {this.context.internet["status"]? <Button mode="contained" style={{paddingVertical:10,backgroundColor:"green"}} onPress={(e)=>{
                       console.log("Hello World")
                   }}>  UPLOAD </Button>:null}

                </View>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignSelf: "center",
        marginVertical: 5, backgroundColor: "#f0faff",
         paddingHorizontal: 20,
         borderRadius: 5,
        paddingVertical:5
    }
})