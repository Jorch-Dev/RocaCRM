import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ApiService } from "../services/api_service";
import { UserContext } from "../context/user_context";

export const LoginView = () => {
  let history = useHistory();
  const { userState, setUserState } = useContext(UserContext);
  const [state_Loguin, setState_Loguin] = useState({
    email: "",
    password: "",
    isLoading: false,
    error: null,
  });

  const llenaEmail = (e) => {
    let dato = e.target.value;

    setState_Loguin({ ...state_Loguin, email: dato });
  };

  const llenaPassword = (e) => {
    let dato = e.target.value;

    setState_Loguin({ ...state_Loguin, password: dato });
  };

  const login = async (e) => {
    e.preventDefault();
    setState_Loguin({ ...state_Loguin, isLoading: true });
    let regext =
      /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/;
    if (!regext.test(state_Loguin.email)) {
      setState_Loguin({
        ...state_Loguin,
        email: "",
        password: "",
        isLoading: false,
        error:
          "Ingresa el correo electrónico que diste de alta al momento de registrarte en el sistema",
      });
      return;
    }

    if (state_Loguin.email !== "" && state_Loguin.password !== "") {
      const body = {
        email: state_Loguin.email,
        password: state_Loguin.password,
      };

      const data = await ApiService("post", "user/login", body);

      if (data.status === 400) {
        setState_Loguin({
          ...state_Loguin,
          email: "",
          password: "",
          isLoading: false,
          error: data.data.error.msg,
        });
      } else {
        localStorage.setItem("token", JSON.stringify(data.data.token));
        const user_result = await ApiService("get", "user");

        if (user_result.status === 401 || user_result.status === 400) {
          setState_Loguin({
            ...state_Loguin,
            email: "",
            password: "",
            isLoading: false,
            error: `Error del sistema, intente de nuevo más tarde o comuníquese con un aseso`,
          });
          return;
        } else {
          setUserState({
            ...userState,
            usuario: user_result.data,
          });

          history.replace("/home");
        }
      }
    }
  };

  // const userAdd = () => {
  //   history.replace("/register");
  // };

  const recovery = () => {
    history.replace("/reset");
  };

  return (
    <div className="contenedor-login">
      <div className="container-fluid h-100 d-flex p-0">
        {/* <div className="row"> */}
        <div className="col-12 col-md-6 d-flex flex-column">
          <div className="row">
            <div className="h-50 d-flex justify-content-center align-items-center">
              <img
                src="assets/roca-crm.svg"
                width="300px"
                className="img-fluid"
              />
            </div>

            <div className="text-center my-3">
              <div className="title_text">Acceder</div>
            </div>

            {state_Loguin.error != null ? (
              <div className="text-center text-red">{state_Loguin.error}</div>
            ) : (
              <></>
            )}

            <div className="col d-flex justify-content-center">
              <form onSubmit={(e) => login(e)}>
 
                  <input
                    type="text"
                    name="email"
                    className="form-input"
                    placeholder="Correo Electrónico"
                    onChange={llenaEmail}
                    value={state_Loguin.email}
                  />
 
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Contraseña"
                    onChange={llenaPassword}
                    value={state_Loguin.password}
                  />

                <div className="d-flex pe-2 my-4">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                  </div>
                  <span className="text-medium text-grey">Recuérdame</span>
                </div>

                <div className="d-grid">
                  <button type="submit" className="cta cta--orange">
                    {state_Loguin.isLoading ? (
                      <>
                        <div className="cta_text cta_text--white mt-1">
                          ACCEDER
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
                        <div className="cta_text cta_text--white">ACCEDER</div>
                      </>
                    )}
                  </button>
                </div>
                <div className="loginform_lost">
                  <div className="text-medium text-grey d-flex justify-content-center">
                    ¿Olvidaste tu contraseña?
                  </div>
                  <div
                    className="text-medium text-grey d-flex justify-content-center cursor-pointer text-decoration-underline"
                    onClick={recovery}
                  >
                    Solicita una nueva contraseña
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="d-none d-md-block col-12 col-md-6 h-100 img_bg">
          <img src="assets/grupo_39.webp" className="d-none d-lg-block"/>
          <img src="assets/grupo_42.webp" className="d-none d-lg-block"/>

          <div className="col d-flex justify-content-center loginform_footer">
            <div className="text-book text-white text-big text-center w-75">
              Automatiza tu negocio con email marketing que maximizará tus
              ventas.
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
