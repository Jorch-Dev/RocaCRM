import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useHistory } from "react-router-dom";

export const RegisterView = () => {
    let history = useHistory();
  const loguin = () => {

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
            <div className="registerform  bg-white">
              <img src="assets/rocacrm.jpeg" alt="" className="img-fluid" />

              <h3 className="fw-bold text-center py-4">
                Registrate para acceder
              </h3>
              <div class="text-center text-orange d-none">
                Este es un error en alguna respuesta
              </div>

              <form className="col-xxl-12 aling-items-center">
                <div className="">
                  <input
                    type="text"
                    name="name"
                    className="form-input_text"
                    placeholder="Nombre"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    name="lastname"
                    className="form-input_text"
                    placeholder="Apellido"
                  />
                </div>
                <div className="">
                  <input
                    type="email"
                    name="email"
                    className="form-input_text"
                    placeholder="Correo Electronico"
                  />
                </div>
                <div className="">
                  <input
                    type="password"
                    name="password"
                    className="form-input_text"
                    placeholder="Contraseña"
                  />
                </div>

                <div className="d-grid">
                  <button className="cta cta--blue">
                    <div className="cta_icon">
                      <AiOutlineUserAdd />
                    </div>
                    <div className="cta_text cta_text--white">Registrate</div>
                  </button>
                </div>

                <div className="text-primary">
                  <span>
                    Ya tienes cuenta?{" "}
                    <a href="#" onClick={loguin}>
                      Inicia sesión aquí
                    </a>
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
