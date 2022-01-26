import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ApiService } from "../services/api_service";

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

    const result = await ApiService("post", resource, obj);
    console.log(result);
    if (result.status === 400 || result.status === 500) {
      setObjMail({
        ...objmail,
        email: "",
        isLoading: false,
        error: result.data.error.msg,
      });
    } else {
      setObjMail({
        ...objmail,
        email: "",
        error:
          "Se mando un correo a su bandeja de entrada con una liga para que pueda restablecer su contraseña, tiene 25 minutos para realizar está acción o de lo contrario tendrá que solicitarlo nuevamente, no olvide revisar su bandeja de spam.",
        isLoading: false,
      });
    }
  };

  const loguin = () => {
    history.push("/");
  };

  return (
    <div className="contenedor-login">
      <div className="container-fluid h-100 d-flex p-0">
        <div className="d-none d-xl-block col-12 col-xl-6 h-100 loginimg_bg">
          <img src="assets/grupo_39.webp" />
          <img src="assets/grupo_42.webp" />

          <div className="d-flex justify-content-center loginform_footer">
            <div className="text-book text-white text-big text-center w-75">
              Automatiza tu negocio con email marketing que maximizará tus
              ventas.
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6 h-100 d-flex justify-content-center">
          <div className="loginform">
            <div className="w-100 d-flex justify-content-center">
              <img
                src="assets/roca-crm.svg"
                width="200px"
                className="img-fluid"
              />
            </div>

            <div className="title text-center">
              <div className="title_text">Recuperar contraseña</div>
            </div>
            <div className="text-medium text-grey text-center">
              Ingrese su dirección de correo electrónico y le enviaremos un
              &nbsp;
              <span className="text-medium text-bluelight cursor-pointer text-decoration-underline ms-1">
                enlace
              </span>
              &nbsp; para restablecer su contraseña.
            </div>

            {objmail.error != null ? (
              <div className="text-center text-red">{objmail.error}</div>
            ) : (
              <></>
            )}

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
                  value={objmail.email}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="cta cta--orange">
                  {objmail.isLoading ? (
                    <>
                      <div className="cta_text cta_text--white mt-1">
                        RECUPERAR
                      </div>
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="cta_text cta_text--white">RECUPERAR</div>
                    </>
                  )}
                </button>
              </div>
              <br />
              <div className="text-medium text-grey d-flex justify-content-center">
                Regresa a&nbsp;
                <span
                  className="text-medium text-grey d-flex justify-content-center cursor-pointer text-decoration-underline"
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
  );
};
