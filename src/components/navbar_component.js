import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AiOutlinePoweroff, AiFillHome } from "react-icons/ai";
import { UserContext } from "../context/user_context";

export const Navbar_view = () => {
  let history = useHistory();
  const { userState, setUserState } = useContext(UserContext);

  const cerrarSesion = () => {
    localStorage.clear();

    history.replace("/");
  };
  return (
    <div className="shadow-sm navbar--blue">
      <div className="d-flex">
        <Link to="/home">
          <img src="/assets/rocacrm.jpeg" className="logo" />
        </Link>
        <div className="col">
          <div className="d-flex">
            <div className="nav-link">
              <AiFillHome size="50" />
              <strong className="px-5">
                {userState.usuario.nombre} {userState.usuario.apellido}
              </strong>
            </div>

            <div className="ms-auto d-flex">
              <Link className="nav-link border" to="/">
                <AiFillHome size="50" />
              </Link>
              <div className="p-3 border">|</div>
              <Link className="nav-link border" to="/">
                <AiFillHome size="50" />
              </Link>
              <div className="p-3 border">|</div>
              <Link className="nav-link border" onClick={cerrarSesion}>
                <AiOutlinePoweroff size="50" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
