import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { DotLoader } from "../components/dotloader_component";
import { ApiService } from "../services/api_service";
import { UserContext } from "../context/user_context";
import { NotificacionContext } from "../context/notification_context";
import { IconUI } from "../utils/IconUI";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/all";

export const LoginView = () => {
  let history = useHistory();
  const { userState, setUserState } = useContext(UserContext);
  const { showNotification } = useContext(NotificacionContext);
  const [state_Loguin, setState_Loguin] = useState({
    email: "",
    password: "",
    isLoading: false,
    error: null,
    eye: false,
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
    console.log(state_Loguin);
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

      if (data != null || data != undefined) {
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
            showNotification(
              "error",
              "Error del sistema",
              "Intente de nuevo más tarde o comuníquese con un asesor",
              undefined,
              4
            );
            setState_Loguin({
              ...state_Loguin,
              email: "",
              password: "",
              isLoading: false,
            });
            return;
          } else {
            setUserState({
              ...userState,
              usuario: user_result.data,
            });
            if (user_result.data.Pln_ID === 1) {
              showNotification(
                "error",
                "Error del sistema",
                "Intente de nuevo más tarde o comuníquese con un asesor",
                undefined,
                4
              );
              setState_Loguin({
                ...state_Loguin,
                email: "",
                password: "",
                isLoading: false,
              });
              history.replace("/");
              return;
            }

            history.replace("/home");
          }
        }
      } else {
        showNotification(
          "error",
          "Error del sistema",
          "Intente de nuevo más tarde o comuníquese con un asesor",
          undefined,
          4
        );
        setState_Loguin({
          ...state_Loguin,
          email: "",
          password: "",
          isLoading: false,
        });
        return;
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

            <div className="col content d-flex justify-content-center">
              <form onSubmit={(e) => login(e)} className="col-8">
                <div className="col">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="tu@correo.com"
                    onChange={llenaEmail}
                    value={state_Loguin.email}
                  />
                </div>

                <div className="col my-3">
                  <div className="d-flex input_icon">
                    <input
                      type={state_Loguin.eye ? "text" : "password"}
                      name="password"
                      className="form-input form-input--full form-input--icon m-0"
                      placeholder="La contraseña con la que te registraste"
                      onChange={llenaPassword}
                      value={state_Loguin.password}
                    />
                    <div
                      className="form-input_icon cursor-pointer"
                      onClick={() => {
                        setState_Loguin({
                          ...state_Loguin,
                          eye: !state_Loguin.eye,
                        });
                      }}
                    >
                      <IconUI color={"#8D949E"} size={20}>
                        {state_Loguin.eye ? (
                          <AiFillEye />
                        ) : (
                          <AiFillEyeInvisible />
                        )}
                      </IconUI>
                    </div>
                  </div>
                </div>

                <div className="d-flex pe-2 my-4">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                  </div>
                  <span className="text-medium text-grey">Recuérdame</span>
                </div>

                <div className="d-grid">
                  {state_Loguin.isLoading ? (
                    <button className="cta_loader cta--orange">
                      <DotLoader />
                    </button>
                  ) : (
                    <button type="submit" className="cta cta--orange">
                      <div className="cta_text cta_text--white">ACCEDER</div>
                    </button>
                  )}
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
          <img src="assets/grupo_39.webp" className="d-none d-lg-block" />
          <img src="assets/grupo_42.webp" className="d-none d-lg-block" />

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
