import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView} from 'react-native';

import Login from "./screens/Login"

import Dashboard from "./screens/Dashboard"

export default class App extends React.Component {

  state = {
    userLoggedIn:false,
    user:null
  }

  handleLogin = () =>{
    this.setState({
      userLoggedIn:true
    })
  }
  render(){
    return (
      <SafeAreaView style={{flex:1,paddingTop:40}}>
          {!this.state.userLoggedIn?<Login handleLogin={this.handleLogin}/>:<Dashboard/>}
      </SafeAreaView>
    );
  }
}

