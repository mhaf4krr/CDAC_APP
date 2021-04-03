
import React from 'react';
import { SafeAreaView} from 'react-native';

import Login from "./screens/Login"

import Dashboard from "./screens/Dashboard"
import NetInfo from "@react-native-community/netinfo";

import GlobalContext from "./context/GlobalContext"



import {backend} from "./constants/backend"


export default class App extends React.Component {

  state = {
    userLoggedIn:false,
    user:null,
    token:null,
    
    internet:{
      type:null,
      status:null
    },

    projects:[],
    selectedProject:null,
   
   
  }




  handleSelectedProject = (value)=>{
    this.setState({
      selectedProject:{...value}
    })
  }


  handleSetProjects = (value) =>{
    this.setState({
      projects:[...value]
    })
  }

  handleSetTitle = (value) =>{
    this.setState({
      selectedProjectTitle:value
    })
  }

  handleLogin = (user,token) =>{
    this.setState({
      userLoggedIn:true,
      user:user,
      token:token
    })
  }

  handleLogout = () =>{
    this.setState({
      userLoggedIn:false,
      user:null,
      token:""
    })
  }


  componentDidMount(){

  let unsubscribe = NetInfo.addEventListener(state => {


    console.log("InternetIsConnected",state.isConnected)

    this.setState({
      internet:{
        type:state.type,
        status:state.isConnected
      }
    })

    
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
            handleLogout:this.handleLogout,
            token:this.state.token,
            projects:this.state.projects,
            handleSetProjects:this.handleSetProjects,
            handleSetTitle:this.handleSetTitle,
            selectedProject:this.state.selectedProject,
            handleSetSelectedProject:this.handleSelectedProject,
           
          }}
        >
  
          {!this.state.userLoggedIn?<Login handleLogin={this.handleLogin} internet={this.state.internet}/>:<Dashboard internet={this.state.internet}/>}
         
          </GlobalContext.Provider>
      </SafeAreaView>
    );
  }
}

