import React, {createContext, useState, useEffect } from "react";
import { ApiService } from "../services/api_service" 

export const UserContext = createContext();

export const User_ContextProvider = ({ children }) => {
  
  const [userState, setUserState] = useState({
    usuario: null
  });

  useEffect(async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    if(userState.usuario === null){
  
        if(token !== null){
            let user_response = await ApiService("get", "user")
            
            setUserState({...userState, usuario:user_response.data})
        }
    }
}, [])

  return (
    <UserContext.Provider
      value={{
        userState,
        setUserState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
