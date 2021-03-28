import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Button, Platform } from 'react-native'
import GlobalContext from '../context/GlobalContext'


export default class Login extends Component {

    state = {
        form: {
            username: "",
            password: ""
        },
    }

    static contextType = GlobalContext



    handleFormFill(key, value) {
        let formData = { ...this.state.form }
        formData[key] = value
        console.log(formData)
        this.setState({ form: { ...formData } })
    }

    render() {





        return (
            <View style={styles["overallWrapper"]}>
                <View>
                    <View style={styles["subWrapper"]}>
                        <Text style={styles["textHeader"]}>Government of Jammu and Kashmir</Text>
                        <Image style={styles["imageWrapper"]} source={require("../assets/images/logo.png")} />
                    </View>

                    <View style={styles["inputWrapper"]}>
                        <TextInput style={styles["input"]} placeholder="Username"  autoCorrect={false} autoCompleteType="off" onChangeText={val => {
                            this.handleFormFill("username", val)
                        }} />
                        <TextInput style={styles["input"]} placeholder="Password" />
                    </View>

                    <View style={styles["btnWrapper"]}>
                        <TouchableOpacity style={styles["btnSubWrapper"]} onPress={e => {
                            this.context.handleLogin(null)
                        }}>
                            <Text style={styles["btnText"]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles["footer"]}>
                    <Text style={styles["internetStatus"]}>Medium : {this.props.internet.type} | Connected: {`${this.props.internet.status}`}</Text>


                    <Text style={{paddingVertical:5}}>
                        This application is developed by JaKeGA
                        </Text>
                        <Text>Jammu & Kashmir e-Governance Agency</Text>
                </View>


            </View>
        )
    }
}

let styles = StyleSheet.create({

    overallWrapper: { justifyContent: "space-between", flex: 1, marginTop: 30 },

    internetStatus: {
        backgroundColor: "gray",
        color: "white",
        padding: 7
    },

    footer: {
        alignItems: "center",
        paddingVertical: 15,
       
    },

    btnText: {
        fontWeight: "500",
        fontSize: 18,
        color: "white"
    }

    ,


    btnSubWrapper: {
        paddingVertical: 15,
        paddingHorizontal: 50,
        backgroundColor: "green"
        , borderRadius: 7,
    },

    btnWrapper: {
        marginTop: 35,

        alignItems: "center"
    },

    textHeader: {
        fontSize: 20,
        fontWeight: "400"
    },

    inputWrapper: {
        marginTop: 35,
        alignItems: 'center'
    },

    input: {
        marginVertical: 20,
        borderBottomColor: "black",
        borderBottomWidth: 2,
        width: "80%",
        fontSize: 15

    },

    subWrapper: {
        alignItems: "center",
        paddingTop: 30
    },

    imageWrapper: {
        marginTop: 20,
        width: 200,
        height: 200
    }
})
