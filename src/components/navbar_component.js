import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AiOutlinePoweroff, AiFillHome } from "react-icons/ai";
import { UserContext } from "../context/user_context";

export const Navbar_view = () => {
  let history = useHistory();
  const { userState, setUserState } = useContext(UserContext);
console.log(userState)
  const cerrarSesion = () => {
    localStorage.clear();

    window.location.replace("/");
  };
  return (
    <nav className="shadow-sm navbar-blue border-0">
      <div className="d-sm-flex">
        <Link to="/home">
          <img
            src="/assets/rocacrm.jpeg"
            width="150"
            height="30"
            className="mt-2"
          />
        </Link>
        <div className="col">
          <div className="d-flex">
            <div className="d-flex">
              <div className="col navbar-item">
                <div className="icon p-2">
                  <AiFillHome size="32" />
                </div>
              </div>

              <span className="navbar_user navbar_user--text">
                {userState.usuario.nombre} {userState.usuario.apellido}
              </span>
            </div>

            <div className="ms-auto d-flex">
                <div className="col navbar-item">
                  <div className="icon p-2">
                    <AiFillHome size="32" />
                  </div>
                </div>
              <div className="p-3">|</div>
                <div className="col navbar-item">
                  <div className="icon p-2">
                    <AiFillHome size="32" />
                  </div>
                </div>
              <div className="p-3">|</div>
                <div className="col navbar-item" onClick={cerrarSesion}>
                  <div className="icon p-2">
                    <AiOutlinePoweroff size="32" />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
