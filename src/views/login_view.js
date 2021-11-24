import React from "react";
import { FcUnlock } from "react-icons/fc";
import { useHistory } from "react-router-dom";

export const Login_view = () => {
    //#region token
  const obj = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUyLCJpYXQiOjE2MzUyNzU4MDMsImV4cCI6MTYzNjEzOTgwM30.4kX3C5E99_xAVuVp0Sak76AipFbEktCnl6kKCUCmdfM"
  }
  //#endregion
  let history = useHistory();
  
  const login = () => {

    localStorage.setItem("token", JSON.stringify(obj));

    history.replace("/home");
  };

  return (
    <div className="container">
      <div className="row y-5">
        <button className="btn btn-primary" onClick={login}>
          <FcUnlock size={50} />
          Acceder
        </button>
      </div>
    </div>
  );
};
