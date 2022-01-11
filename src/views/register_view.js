import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { ApiRegister } from "../services/api_service";

export const RegisterView = () => {
  let history = useHistory();
  const [stateuser, setStateuser] = useState({
    Con_Name: "",
    Con_Lastname: "",
    Con_Email: "",
    Con_Pwd: "",
    error: null,
    isLoading: false,
  });

  const registro = async (e) => {
    e.preventDefault();

    var exName = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    if (!exName.test(stateuser.Con_Name)) {
      setStateuser({
        ...stateuser,
        Con_Name: "",
        error: "El campo nombre solo puede contener espacios y letras",
      });
      return;
    }

    var exPass =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-/]).{8,}$/;
    if (!exPass.test(stateuser.Con_Pwd)) {
      setStateuser({
        ...stateuser,
        Con_Pwd: "",
        error:
          "Debe contener mínimo 8 posiciones considerando al menos una mayúscula, un carácter especial .#?!@$%^&*-/ y un número",
      });
      return;
    }

    var exEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!exEmail.test(stateuser.Con_Email)) {
      setStateuser({
        ...stateuser,
        Con_Email: "",
        error: "El formato de correo electrónico no es el correcto",
      });
      return;
    }

    const obj = {
      Usr_Email: stateuser.Con_Email,
      Usr_Name: stateuser.Con_Name,
      Usr_Lastname: stateuser.Con_Lastname,
      Usr_Password: stateuser.Con_Pwd,
    };
    const result = await ApiRegister(obj);
  };

  const loguin = () => {
    history.push("/");
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
            <div className="w-100 d-flex justify-content-center">
                <img
                  src="assets/roca-crm.svg"
                  width="200px"
                  className="img-fluid"
                />
              </div>

              <div className="title text-center">
                <div className="title_text">Registrate para acceder</div>
              </div>

              <div class="text-center text-red d-none">
                Este es un error en alguna respuesta
              </div>

              <form
                className="col-xxl-12 aling-items-center"
                onSubmit={(e) => registro(e)}
              >
                <div className="">
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Nombre"
                    onChange={(evt) => {
                      setStateuser({
                        ...stateuser,
                        Con_Name: evt.currentTarget.value,
                      });
                    }}
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    name="lastname"
                    className="form-input"
                    placeholder="Apellido"
                    onChange={(evt) => {
                      setStateuser({
                        ...stateuser,
                        Con_Lastname: evt.currentTarget.value,
                      });
                    }}
                  />
                </div>
                <div className="">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Correo Electronico"
                    onChange={(evt) => {
                      setStateuser({
                        ...stateuser,
                        Con_Email: evt.currentTarget.value,
                      });
                    }}
                  />
                </div>
                <div className="">
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Contraseña"
                    onChange={(evt) => {
                      setStateuser({
                        ...stateuser,
                        Con_Pwd: evt.currentTarget.value,
                      });
                    }}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="cta cta--orange">
                    {stateuser.isLoading ? (
                      <>
                        <div className="cta_text cta_text--white mt-1">
                          REGISTRATE
                        </div>
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="cta_text cta_text--white">
                          REGISTRATE
                        </div>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-medium text-grey d-flex justify-content-center">
                  Ya tienes cuenta?
                  <span
                    className="text-medium text-grey d-flex justify-content-center cursor-pointer text-decoration-underline"
                    onClick={loguin}
                  >
                    Inicia sesión aquí
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
