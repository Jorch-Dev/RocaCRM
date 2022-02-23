import React, { createContext, useState } from "react";

export const NotificacionContext = createContext();

export const NotificacionContextProvider = ({ children }) => {
  const [notificacionState, setNotificacionState] = useState({
    title: "notificacion",
    note: "note",
    show: false,
    type: "",
    onContinue: () => {},
  });

  const closeNotification = (t) => {
    setNotificacionState({ ...notificacionState, show: false, note: "", title:"" });
  };

  const showNotification = (
    type,
    title,
    note,
    onContinue = () => {},
    time = null
  ) => {
    setNotificacionState({
      ...notificacionState,
      show: true,
      type,
      note,
      title,
      onContinue,
    });

    if (time !== null) {
      setTimeout(() => {
        closeNotification(time);
      }, time * 1000);
    }
  };

  const onContinue = () => {
    notificacionState.onContinue();
    closeNotification();
  };

  return (
    <NotificacionContext.Provider
      value={{
        notificacionState,
        setNotificacionState,
        closeNotification,
        showNotification,
        onContinue,
      }}
    >
      {children}
    </NotificacionContext.Provider>
  );
};
