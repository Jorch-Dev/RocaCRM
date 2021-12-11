import React from "react";
import { useHistory } from "react-router-dom";
import { RiDeviceRecoverFill } from "react-icons/ri"

export const ResetPasswordView = () => {
  let history = useHistory();
  const recupera = () => {
    history.replace("/");
  };
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
              <div class="text-center text-orange d-none">
                Este es un error en alguna respuesta
              </div>

              <form className="col-xxl-12 aling-items-center">
                <div className="">
                  <input
                    type="password"
                    name="password1"
                    className="form-input_text"
                    placeholder="Contraseña"
                  />
                </div>

                <div className="">
                  <input
                    type="password"
                    name="password2"
                    className="form-input_text"
                    placeholder="Contraseña"
                  />
                </div>

                <div className="d-grid">
                  <button className="cta cta--blue" onClick={recupera}>
                    <div className="cta_icon">
                      <RiDeviceRecoverFill />
                    </div>
                    <div className="cta_text cta_text--white">RECUPERAR</div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
