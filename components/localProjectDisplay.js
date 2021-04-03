import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
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

            <View style={{ backgroundColor: "white", paddingVertical: 25, paddingHorizontal: 15, marginVertical: 25, width: "92%", alignSelf: "center", borderRadius: 10, borderColor: "#77a7e6", borderWidth: 1 }}>
                <Text>DATED : {this.state["dated"]}</Text>
                {console.log(this.state)}
                <TouchableOpacity onPress={e => this.props.navigation.navigate("Preview", {
                    uri: this.state["photo_local_url"]
                })}>
                    <Image style={{ height: 250, marginVertical: 10, borderRadius: 5 }} source={{ uri: `${this.state["photo_local_url"]}` }} />
                </TouchableOpacity>

                <View style={{

                }}>

                    <View style={styles["row"]}>
                        <Paragraph>
                           {this.state["project_desc"]}
                        </Paragraph>
                    </View>

                    <View style={styles["row"]}>
                        <Paragraph>
                           {this.state["project_title"]}
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

                    {this.context.internet["status"] ? (
                        <View style={{width:"100%",flexDirection:'row',justifyContent:"space-evenly",marginTop:20}}>
                            <Button mode="contained" icon="upload" style={{ width:"35%",paddingVertical: 10, backgroundColor: "green" }} onPress={(e) => {
                                console.log("Hello World")
                            }}>  UPLOAD </Button>

                            <Button mode="contained" icon="map-marker" style={{width:"35%", paddingVertical: 10, backgroundColor: "orange" }} onPress={(e) => {
                                this.props.navigation.navigate("Map",{
                                    ...this.state.coords
                                })
                            }}>  MAP </Button>
                        </View>
                    ) : null}

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
        paddingVertical: 5
    }
})