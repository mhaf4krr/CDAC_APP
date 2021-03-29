
import React from 'react';
import { SafeAreaView} from 'react-native';

import Login from "./screens/Login"

import Dashboard from "./screens/Dashboard"
import NetInfo from "@react-native-community/netinfo";

import GlobalContext from "./context/GlobalContext"


export default class App extends React.Component {

  state = {
    userLoggedIn:false,
    user:null,
    
    internet:{
      type:null,
      status:null
    }
  }

  handleLogin = (user) =>{
    this.setState({
      userLoggedIn:true
    })
  }

  handleLogout = () =>{
    this.setState({
      userLoggedIn:false,
      user:null
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
      <SafeAreaView style={{flex:1}}>
        <GlobalContext.Provider
          value={{
            userLoggedIn:this.state.userLoggedIn,
            user:this.state.user,
            internet:{...this.state.internet},
            handleLogin:this.handleLogin,
            handleLogout:this.handleLogout
          }}
        >
          {!this.state.userLoggedIn?<Login handleLogin={this.handleLogin} internet={this.state.internet}/>:<Dashboard internet={this.state.internet}/>}
          </GlobalContext.Provider>
      </SafeAreaView>
    );
  }
}

