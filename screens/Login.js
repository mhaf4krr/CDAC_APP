import React, { Component } from 'react'
import { Text, View,Image,StyleSheet,TextInput,TouchableOpacity,Alert,Button,Platform} from 'react-native'


export default class Login extends Component {

    state = {
       form:{
        username:"",
        password:""
       },
    }



 

    handleFormFill(key,value){
        let formData ={...this.state.form}
        formData[key] = value
        console.log(formData)
        this.setState({form:{...formData}})
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
                        <TextInput style={styles["input"]} placeholder="Username" autoCorrect={false} autoCompleteType="off" onChangeText={val=>{
                            this.handleFormFill("username",val)
                        }}/>
                        <TextInput style={styles["input"]} placeholder="Password"/>
                </View>

                <View style={styles["btnWrapper"]}>
                   <TouchableOpacity style={styles["btnSubWrapper"]} onPress={e=>{
                       this.props.handleLogin()
                   }}>
                       <Text style={styles["btnText"]}>Login</Text>
                   </TouchableOpacity>
                </View>
              </View>

                <View style={styles["footer"]}>
                    <Text style={styles["internetStatus"]}>Medium : {this.props.internet.type} | Connected: {`${this.props.internet.status}`}</Text>

                 
                        <Text style={styles["footerText"]}>
                            This application is designed and developed by JaKeGA
                        </Text>
                </View>

               
            </View>
        )
    }
}

let styles = StyleSheet.create({

    overallWrapper:{justifyContent:"space-between",flex:1,},
  
    internetStatus:{
        backgroundColor:"green",
        color:"white",
        padding:7
    },

    footer:{alignItems:"center",
    paddingVertical:15,
backgroundColor:"gray"},

    btnText:{
        fontWeight:"500",
        fontSize:18,
        color:"white"
    }
    
    ,


    btnSubWrapper:{
        paddingVertical:20,
        paddingHorizontal:40,
        backgroundColor:"green"
        , borderRadius:7,
    },

    btnWrapper:{
        marginTop:35,
       
        alignItems:"center"
    },

    textHeader :{
        fontSize:20,
        fontWeight:"400"
    },  

    inputWrapper:{
        marginTop:35,
        alignItems:'center'
    },

    input:{
        marginVertical:20,
        borderBottomColor:"black",
        borderBottomWidth:2,
        width:"80%",
        fontSize:20
        
    }, 

    subWrapper:{
        alignItems:"center",
        paddingTop:30
    },

    imageWrapper:{
        marginTop:20,
        width:200,
        height:200
    }
})
