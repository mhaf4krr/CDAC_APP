import React from "react";

export default React.createContext({
     userLoggedIn:false,
    user:null,
    
    internet:{
      type:null,
      status:null
    },

    handleLogin:()=>{},
    handleLogout:()=>{}

})