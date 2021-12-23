import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AiOutlinePoweroff, AiFillHome } from "react-icons/ai";
import { UserContext } from "../context/user_context";

export const Navbar_view = () => {
  let history = useHistory();
  const { userState, setUserState } = useContext(UserContext);
  console.log(userState);
  const cerrarSesion = () => {
    localStorage.clear();

    window.location.replace("/");
  };
  return (
    //bg-blue
    <nav className="navbar shadow-sm bg-blue">
      <div className="container-fluid">
        <div className="w-100 d-none d-sm-flex">
          <div class="d-flex justify-content-center align-items-center">
            <div class="col text-center">
              <img src="/assets/rocacrm.jpeg" width="150" height="30" />
            </div>
            <div class="navbar-item">
              <div className="icon p-2">
                <AiFillHome size="32" />
              </div>
            </div>
            <div class="col">
              <span className="navbar_user navbar_user--text">
                {userState.usuario.nombre} {userState.usuario.apellido}
              </span>
            </div>
          </div>

          <div className="ms-auto d-flex">
            <div className="h-100 navbar-item">
              <div className="icon p-2">
                <AiFillHome size="32" />
              </div>
            </div>
            <div className="h-100 navbar-item">
              <div className="icon p-2">
                <AiFillHome size="32" />
              </div>
            </div>
            <div className="h-100 navbar-item" onClick={cerrarSesion}>
              <div className="icon p-2">
                <AiOutlinePoweroff size="32" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 d-sm-none">
          <div class="d-flex justify-content-center align-items-center">
            <div class="col text-center">
              <img src="/assets/rocacrm.jpeg" width="130" height="30" />
            </div>
            <div class="navbar-item">
              <div className="icon p-2">
                <AiFillHome size="32" />
              </div>
            </div>
            <div class="col border">
              <p className="navbar_user navbar_user--text">
                {userState.usuario.nombre} {userState.usuario.apellido}
              </p>
            </div>
          </div>

          <div className="ms-auto d-flex">
            <div className="navbar-item">
              <div className="icon p-2">
                <AiFillHome size="32" />
              </div>
            </div>
            <div className="navbar-item">
              <div className="icon p-2">
                <AiFillHome size="32" />
              </div>
            </div>
            <div className="navbar-item" onClick={cerrarSesion}>
              <div className="icon p-2">
                <AiOutlinePoweroff size="32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
