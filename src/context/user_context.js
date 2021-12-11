import React, {createContext, useState } from "react";

export const UserContext = createContext();

export const User_ContextProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    usuario: {
      nombre: "",
      apellido: " ",
      email: "",
    },
  });

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
