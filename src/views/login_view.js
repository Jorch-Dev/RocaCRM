import React from "react";
import { MdLogin } from "react-icons/md";
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

  const userAdd = () => {
    history.replace("/register");
  }

  return (
    <div className="container-fluid bg-light-blue d-flex justify-content-center align-items-center h-100">
      <div className="container">
        <div className="row m-0">
          <div className="col-12 col-lg-6 p-0">
            <div className="w-100 h-100 d-none d-lg-flex justify-content-center align-items-center">
              <img src="assets/lap.png" alt="" className="w-100 max-640" />
            </div>
          </div>

          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center p-0">
            <div className="loginform  bg-white">

              <img src="assets/rocacrm.jpeg" alt="" className="img-fluid" />

              <h2 className="fw-bold text-center py-4">Bienvenido</h2>
              <div class="text-center text-orange d-none">Este es un error en alguna respuesta</div>


              <form className="col-xxl-12 aling-items-center">

                <div className="">
                  <input type="email" name="email" className="form-input_text" placeholder="Correo Electronico" />
                </div>
                <div className="">
                  <input type="password" name="password" className="form-input_text" placeholder="Contraseña" />
                </div>

                <div className="d-flex pe-2 mb-3">
                  <div className="col"></div>
                  <span>
                    <a href="#">Recuperar contraseña</a>
                  </span>
                </div>

                <div className="d-grid">
                  

                  <button className="cta cta--blue" onClick={login}>
                    <div className="cta_icon">
                        <MdLogin />
                    </div>
                    <div className="cta_text cta_text--white">ACCEDER</div>
                    
                  </button>

                </div>

                <div className="text-primary">
                  <span>
                    No tienes cuenta? <a href="#" onClick={userAdd}>Regístrate</a>
                  </span>
                </div>

              </form>
            
            
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
