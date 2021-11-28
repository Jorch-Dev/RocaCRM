import React from "react";
import { FcUnlock } from "react-icons/fc";
import { useHistory } from "react-router-dom";

export const Login_view = () => {
  //#region token
  const obj = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUyLCJpYXQiOjE2MzUyNzU4MDMsImV4cCI6MTYzNjEzOTgwM30.4kX3C5E99_xAVuVp0Sak76AipFbEktCnl6kKCUCmdfM",
  };
  //#endregion
  let history = useHistory();

  const login = () => {
    localStorage.setItem("token", JSON.stringify(obj));

    history.replace("/home");
  };

  return (
    <div className="container w-50 bg-light reunded shadow my-5">
      <div className="row align-items-stretch">
        <div className="col border d-none d-lg-block">
          <img src="assets/RF_Square_Blue.jpg" alt="" className="img-fluid" />
        </div>
        <div className="col border d-none d-md-block px-5 py-5">
            <div className="text-end">
              <img src="assets/rocacrm.jpeg" alt="" className="img-fluid" />
            </div>
            <h2 className="fw-bold text-center py-5">Bienvenido</h2>

            {/* //login  */}
            <form action="#">
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <input type="email" className="form-control" name="email" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary " onClick={login}>
                  <FcUnlock /> Acceder
                </button>
              </div>

              <div className="my-3">
                <span>
                  No tienes cuenta? <a href="#">Regístrate</a>
                </span>
                <br />
                <span>
                  <a href="#">Recuperar contraseña</a>
                </span>
              </div>
            </form>
        </div>

        {/* */}
      </div>
    </div>
  );
};
