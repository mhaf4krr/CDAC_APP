import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView} from 'react-native';

import Login from "./screens/Login"

import Dashboard from "./screens/Dashboard"
import NetInfo from "@react-native-community/netinfo";


export default class App extends React.Component {

  state = {
    userLoggedIn:false,
    user:null,
    
    internet:{
      type:null,
      status:null
    }
  }

  handleLogin = () =>{
    this.setState({
      userLoggedIn:true
    })
  }

 
  componentDidMount(){

  let unsubscribe = NetInfo.addEventListener(state => {


    
    this.setState({
      internet:{
        type:state.type,
        status:state.isConnected
      }
    })

    console.log(this.state.internet)
  });

  }

  render(){
    return (
      <SafeAreaView style={{flex:1,paddingTop:40}}>
          {!this.state.userLoggedIn?<Login handleLogin={this.handleLogin} internet={this.state.internet}/>:<Dashboard/>}
      </SafeAreaView>
    );
  }
}

