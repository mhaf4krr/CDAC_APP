import React from "react";

export default React.createContext({
     userLoggedIn:false,
    user:null,
    token:"",
    
    internet:{
      type:null,
      status:null
    },

    projects:[],
    selectedProject:null,

  
    
    handleSetSelectedProject:()=>{},
    handleLogin:()=>{},
    handleLogout:()=>{},
    handleSetProjects:()=>{},
    handleSetTitle:()=>{},
    


})