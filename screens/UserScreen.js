import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import { Appbar, Avatar, Subheading, Headline, Divider,Button } from "react-native-paper"

import GlobalContext from "../context/GlobalContext"



export default function UserScreen() {
    return (
        <GlobalContext.Consumer>
            {context =>(
                <ScrollView>
                <View>
                    <Appbar.Header style={{ backgroundColor: "#4287f5" }}>
                        <Appbar.Content title="User Profile" />
                    </Appbar.Header>
    
                    <View style={styles["vectorWrapper"]} >
                        <Avatar.Icon style={{ backgroundColor: "#4287f5" }} color="white" size={150} icon="account" />
                    </View>
    
                    <View style={styles["infoWrapper"]}>
    
                        <Divider />
    
                        <View style={styles["row"]}>
                            <Subheading>User's Name</Subheading>
                            <Subheading>Mufti Hyder Ali</Subheading>
                        </View>
    
                        <Divider />
    
                        <View style={styles["row"]}>
                            <Subheading>Role</Subheading>
                            <Subheading>Junior Engineer</Subheading>
                        </View>
    
                        <Divider />
    
                        <View style={styles["row"]}>
                            <Subheading>Division</Subheading>
                            <Subheading>Kashmir</Subheading>
                        </View>
    
                        <Divider />
    
                        <View style={styles["row"]}>
                            <Subheading>Phone</Subheading>
                            <Subheading>7006225524</Subheading>
                        </View>
                    </View>
    
                    <View>
                    <Button icon="account" mode="contained" style={{
                        width:"50%",
                        paddingVertical:10,
                        alignSelf:"center",
                        marginTop:50,
                        backgroundColor:'#d63e20'
                    }} onPress={() => context.handleLogout()}>
        Logout
      </Button>
                    </View>
                </View>
            </ScrollView>
            )}
        </GlobalContext.Consumer>
    )
}


const styles = StyleSheet.create(
    {
        infoWrapper: {
            width: "70%",
            alignSelf: "center",
            marginTop: 30
        },
        vectorWrapper: {
            marginTop: 40,
            alignSelf: "center",

            borderRadius: 100
        }

        ,

        row: {
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'space-between'
        }
    }
)

