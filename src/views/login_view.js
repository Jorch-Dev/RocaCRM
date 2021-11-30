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
    <div className="w-100 h-100 m-0 p-0 border bg-primary">
      <div className="row mx-5 my-5">
        <div className="col align-items-stretch d-none d-md-block">
          <img
            src="assets/lap.png"
            alt=""
            className="img-fluid mx-5 my-5"
          />
        </div>
        <div className="col d-none d-md-block d-lg-block d-xl-block d-xxl-block">
          <div className="mx-5 my-5 pt-2 pb-3 px-5 bg-white rounded shadow col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
              <img src="assets/rocacrm.jpeg" alt="" className="img-fluid" />
            <h2 className="fw-bold text-center py-4">Bienvenido</h2>

            {/* //login  */}
            <form className="col-xxl-12 aling-items-center">
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
                <button className="btn btn-primary w-100 my-1" onClick={login}>
                  <div className="row align-items-center">
                    <div className="col-12 text-center">
                      <FcUnlock />
                      Acceder
                    </div>
                  </div>
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
        </div>
        
        <div className="py-5 px-5 d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none bg-white rounded shadow col-sm-10">
              <img src="assets/rocacrm.jpeg" alt="" className="img-fluid" />
            <h2 className="fw-bold text-center py-4">Bienvenido</h2>

            {/* //login  */}
            <form className="col">
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
                <button className="btn btn-primary w-100 my-1" onClick={login}>
                  <div className="row align-items-center">
                    <div className="col-12 text-center">
                      <FcUnlock />
                      Acceder
                    </div>
                  </div>
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
     
      </div>
    </div>
  );
};
