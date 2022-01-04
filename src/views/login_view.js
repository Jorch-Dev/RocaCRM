import React, { useState, useContext } from "react";
import { MdLogin } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { ApiLogin } from "../services/api_service";
import { UserContext } from "../context/user_context";
import { FaRegHandshake } from "react-icons/fa";
import { lightBlue } from '../styles/colors';

export const Login_view = () => {
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

    if (state_Loguin.email != "" && state_Loguin.password != "") {
      const obj = {
        email: state_Loguin.email,
        password: state_Loguin.password,
      };

      const data = await ApiLogin(obj);

      if (data.status === 400) {
        setState_Loguin({
          ...state_Loguin,
          email: "",
          password: "",
          isLoading: false,
          error: data.data.error.msg,
        });
      } else {
        localStorage.setItem("token", JSON.stringify(data.token));
        setUserState({
          ...userState,
          usuario: {
            nombre: data.user.Usr_Name,
            apellido: data.user.Usr_Lastname,
            email: data.user.Usr_Email,
          },
        });

        history.replace("/contacts_view");
      }
    }
  };

  const userAdd = () => {
    history.replace("/register");
  };

  const recovery = () => {
    history.replace("/reset");
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

              <div className="title d-flex">
                <div className="title_text tittle_text--lightblue">
                  Bienvenido
                </div>
                <div className="title_icon">
                  <FaRegHandshake size={48} color={lightBlue} />
                </div>
              </div>

              {state_Loguin.error != null ? (
                <div className="text-center text-red">
                  {state_Loguin.error}
                </div>
              ) : (
                <></>
              )}

              <form
                className="col-xxl-12 aling-items-center"
                onSubmit={(e) => login(e)}
              >
                <div className="">
                  <input
                    type="text"
                    name="email"
                    className="form-input"
                    placeholder="Correo Electronico"
                    onChange={llenaEmail}
                    value={state_Loguin.email}
                  />
                </div>
                <div className="">
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Contraseña"
                    onChange={llenaPassword}
                    value={state_Loguin.password}
                  />
                </div>

                <div className="d-flex pe-2 mb-3">
                  <div className="col"></div>
                  <div
                    className="text text-orange cursor-pointer text-decoration-underline"
                    onClick={recovery}
                  >
                    Recuperar contraseña
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="cta cta--blue">
                    {state_Loguin.isLoading ? (
                      <>
                        <div className="cta_icon">
                          <MdLogin />
                        </div>
                        <div className="cta_text cta_text--white">ACCEDER</div>
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="cta_icon">
                          <MdLogin />
                        </div>
                        <div className="cta_text cta_text--white">ACCEDER</div>
                      </>
                    )}
                  </button>
                </div>

                <div className="text">¿No tienes cuenta?</div>
                <div
                  className="text text-orange cursor-pointer text-decoration-underline"
                  onClick={userAdd}
                >
                  Regístrate
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
