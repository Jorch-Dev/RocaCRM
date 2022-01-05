import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { RiDeviceRecoverFill } from "react-icons/ri";
import { postForgotPassword } from "../services/api_service";
import { lightBlue } from "../styles/colors";

export const ResetPasswordView = () => {
  let history = useHistory();
  const [objmail, setObjMail] = useState({
    email: "",
    error: null,
    isLoading: false,
  });

  const recupera = async (e) => {
    e.preventDefault();
    setObjMail({
      ...objmail,
      isLoading: true,
    });
    let regext =
      /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/;
    if (!regext.test(objmail.email)) {
      setObjMail({
        ...objmail,
        email: "",
        error: "el formato de Correo Electrónico no es el correcto",
        isLoading: false,
      });
      return;
    }

    const obj = JSON.stringify({
      email: objmail.email,
    });
    let resource = `user/forgot/password`;

    const result = await postForgotPassword(obj, resource);
    console.log(result);
    setObjMail({
      ...objmail,
      email: "",
      error:
        "Se mando un correo a su bandeja de entrada con una liga para que pueda restablecer su contraseña, tiene 25 minutos para realizar está acción o de lo contrario tendrá que solicitarlo nuevamente, no olvide revisar su bandeja de spam.",
      isLoading: false,
    });
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
            <div className="loginform  bg-white">
              <img src="assets/rocacrm.jpeg" alt="" className="img-fluid" />

              <div className="title d-flex">
                <div className="title_text tittle_text--lightblue">
                  Recuperar contraseña
                </div>
                <div className="title_icon">
                  <RiDeviceRecoverFill size={48} color={lightBlue} />
                </div>
              </div>

              <div className="text text-secondary">
                Ingrese su dirección de correo electrónico y le enviaremos un
                enlace para restablecer su contraseña.
              </div>
              <div className="text-center text-orange d-none">
                Este es un error en alguna respuesta
              </div>

              <form
                className="col-xxl-12 aling-items-center"
                onSubmit={(e) => recupera(e)}
              >
                <div className="">
                  <input
                    type="text"
                    name="email"
                    className="form-input"
                    placeholder="tu@correo"
                    onChange={(e) =>
                      setObjMail({ ...objmail, email: e.target.value })
                    }
                  />
                </div>

                <div className="d-grid">
                  <button className="cta cta--blue">
                    {objmail.isLoading ? (
                      <>
                        <div className="cta_icon">
                          <RiDeviceRecoverFill />
                        </div>
                        <div className="cta_text cta_text--white">
                          RECUPERAR
                        </div>
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          <span className="visually-hidden">loading...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="cta_icon">
                          <RiDeviceRecoverFill />
                        </div>
                        <div className="cta_text cta_text--white">
                          RECUPERAR
                        </div>
                      </>
                    )}
                  </button>
                </div>

                <div className="text">
                  Regresa a&nbsp;
                  <span
                    className="text text-orange cursor-pointer text-decoration-underline"
                    onClick={loguin}
                  >
                    login
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
