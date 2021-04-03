import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Button, Platform } from 'react-native'
import GlobalContext from '../context/GlobalContext'


import {backend} from "../constants/backend"

import sha256 from "crypto-js/sha256"
import MD5 from 'crypto-js/md5'

export default class Login extends Component {

    state = {
        form: {
            username: "",
            password: ""
        },

        isBtnDisabled:true
    }

    static contextType = GlobalContext



    isBtnDisabled = ()=>{

        console.log("Called ")

        let form = this.state["form"]

        if(form["username"] === "" || form["password"] === ""){
            return true
        }

        return false
    }

    handleFormFill(key, value) {
        let formData = { ...this.state.form }
        formData[key] = value
     
        this.setState({ form: { ...formData } })
    }

     async connectToServerforAuth(){
       try {
        let form = this.state.form

        let formData = new FormData()
        formData.append("loginUsername",form["username"])
        let hashedPassword = this.generateHashForPassord(form["password"])

        formData.append("loginPassword",hashedPassword)

        console.log(form["username"],hashedPassword)

      

        let response = await fetch(backend+"mobilelogMeIn.html",{
            method:"POST",
            body:formData
        })
        

        if(response.status === 200){
           let userData = await response.json()
           
           if(userData["success"]){
            this.context.handleLogin(userData["empDetails"],userData["message"])
           }

           else{
            Alert.alert(
                "Login Failed",
                "Either the username or password is incorrect",[
                    {
                        text:"Okay",
                    }
                ]
            )
           }
          
        }

        else {
            console.log("Login Failed")
            Alert.alert(
                "Error",
                "Error occured at the server",[
                    {
                        text:"Okay",
                    }
                ]
            )
        }
       } catch (error) {
           console.log(error)
       }
        
    }


    generateHashForPassord(password){
        let round1Hash = sha256(password).toString()
        console.log("SHA256",round1Hash)
        let round2Hash = MD5(round1Hash).toString()
        console.log("SHA256 -> MD5",round2Hash) 
        return round2Hash
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
                        <TextInput style={styles["input"]} placeholder="Password" secureTextEntry={true} onChangeText={val => {
                            this.handleFormFill("password", val)
                        }} />
                    </View>

                    <View style={styles["btnWrapper"]}>
                        <TouchableOpacity disabled={this.isBtnDisabled()}  style={styles["btnSubWrapper"]} onPress={e => {
                            this.connectToServerforAuth()
                       
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
