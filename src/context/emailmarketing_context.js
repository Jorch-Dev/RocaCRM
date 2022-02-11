import React, { createContext, useState } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";

export const MarketingContext = createContext();

export const MarketingContextProvider = ({ children }) => {
  const [marketingState, setMarketingState] = useState({
    tipoEnvio: "",
    contentHTML: null,
    sendItems: [],
    deleteItems: [],
    enviado: "",
    envioRapido: false,
    emailSettings: false,
    objetoSettings: {
      remitente: "",
      emailremitente: "",
      asunto: "",
    },
  });
  console.log(marketingState);
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
