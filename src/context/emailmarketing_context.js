import React, { createContext, useState } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";

export const MarketingContext = createContext();

export const MarketingContextProvider = ({ children }) => {
  const [marketingState, setMarketingState] = useState({
    tipo: "",
    contentHTML: null,
    sendItems: [],
    deleteItems: [],
    enviado: ""
  });
 console.log(marketingState)
  return (
    <MarketingContext.Provider
      value={{
        marketingState,
        setMarketingState,
      }}
    >
      {children}
    </MarketingContext.Provider>
  );
};
