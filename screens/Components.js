import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Button, Touchable, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location';

import { List, Paragraph, Caption, Headline, Divider, Button as ButtonPaper } from "react-native-paper"

import ProjectComponent from "../components/ProjectComponent"




export default class Components extends Component {

    state = {
        location: null,
        errorMsg: null,
        Headline: "Waiting for Location"

    }



    async componentDidMount() {
        try {
            let { status } = await Location.requestPermissionsAsync()
            if (status !== "granted") {


                throw new Error("Location Denied")
            }

            let location = await Location.getCurrentPositionAsync({})
            this.setState({
                location: location
            })
        } catch (error) {
            console.log(error)
            this.setState({
                errorMsg: "This app requires GPS/Location services to work as expected. Please allow the access when prompted next time.",
                Headline: "Critical Application Error"
            })


            setTimeout(() => {
                this.props.navigation.goBack()
            }, 3000)
        }
    }

    render() {

        return (
            <View>
                {
                    this.state.location === null ? (
                        <View style={{
                            flex: 1
                        }}>

                            <View style={{ width: "85%", alignSelf: "center", marginTop: 40 }}>
                                <Headline>{this.state["Headline"]}</Headline>
                                <Paragraph>{this.state.errorMsg}</Paragraph>

                            </View>




                        </View>

                    ) : (
                        <ScrollView style={styles["mainWrapper"]}>

                            {/* <Text>{JSON.stringify(this.state.location || this.location.errorMsg)}</Text> */}

                            <List.Section title="PROJECT TITLE">

                                <ProjectComponent title="COMPONENT TITLE" />

                                <ProjectComponent title="COMPONENT TITLE 2" />

                                <ProjectComponent title="COMPONENT TITLE 3" />

                                <ProjectComponent title="COMPONENT TITLE 4" />
                            </List.Section>


                            {/* PHOTOGRAPH SECTION */}

                            <View style={{ width: "80%", marginTop: 10, alignSelf: "center",paddingVertical:20 }}>
                                <Divider />

                                <Headline style={{
                                    fontSize: 17,
                                    paddingHorizontal: 20
                                }}>UPLOAD PROJECT PHOTOGRAPH</Headline>


                                <Paragraph style={{ marginTop: 30, textAlign: 'justify' }}>
                                    Use the button below to upload a GIS based photograph related to the project
                                </Paragraph>

                                <View style={{
                                    marginTop: 20
                                }}>
                                    <ButtonPaper style={{ backgroundColor: 'green', paddingVertical: 10 }} icon="camera" mode="contained" onPress={() => this.props.navigation.navigate("Camera Screen",{location:this.state.location})}>
                                        ACCESS CAMERA
  </ButtonPaper>
                                </View>
                            </View>

                        </ScrollView>
                    )

                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainWrapper: {
        width: "100%",
        alignSelf: "center"
    }
})