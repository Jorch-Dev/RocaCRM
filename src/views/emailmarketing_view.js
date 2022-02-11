import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user_context";
import { BiMailSend, CgTemplate } from "react-icons/all";
import { IconUI } from "../utils/IconUI";
import { white } from "../styles/colors";
import { MarketingContext } from "../context/emailmarketing_context";
import { EmailEditorComponent } from "../components/emaileditor_component";

export const EmailMarketingView = () => {
  const { userState } = useContext(UserContext);
  const { marketingState, setMarketingState } = useContext(MarketingContext);
  const [marketState, setMarketState] = useState({
    provider: false,
    isLoading: false,
    error: null,
  });

  const netxitem = () => {
    setMarketState({ ...marketState, isLoading: true });
    if (marketingState.tipoEnvio != null) {
      setMarketState({ ...marketState, isLoading: false, provider: true });
      return;
    } else {
      setMarketState({
        ...marketState,
        isLoading: false,
        error: "Debes de seleccionar un tipo",
      });
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="contenedor-dashboard">
        <div className="position-relative p-1">
          <div className="text-big text-primary text-bold">Bienvenido</div>
          <div className="text-secondary text-0">
            {userState.usuario !== null ? (
              <>
                <span className="text-0">
                  {userState.usuario.Usr_Name} {userState.usuario.Usr_Lastname}
                </span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {marketState.provider ? (
        <EmailEditorComponent />
      ) : (
        <>
          <div className="contenedor-dashboard">
            <div className="card  d-block p-2 my-2">
              <div className="w-100 d-flex">
                <div className="col d-flex justify-content-center align-items-center">
                  <div>
                    Te guiaremos paso a paso para crear{" "}
                    <b>correo electrónico</b>{" "}atractivo para tus clientes solo
                    selecciona un tipo.
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              {marketState.error != null ? (
                <p className="text-center text-orange">{marketState.error}</p>
              ) : (
                <></>
              )}
              <div className="col d-flex justify-content-center my-3">
                <div className="col-4">
                  <div className="col my-3 d-flex justify-content-center">
                    <button
                      data-bs-toggle="collapse"
                      href="#information"
                      role="button"
                      aria-expanded="false"
                      aria-controls="information"
                      className="cta cta--orange"
                      onClick={() =>
                        setMarketingState({
                          ...marketingState,
                          tipoEnvio: "Envio rapido",
                        })
                      }
                    >
                      <div className="d-flex align-items-center">
                        <IconUI color={white} size={30}>
                          <BiMailSend />
                        </IconUI>
                        <div className="cta_text ps-2">Envio rapido</div>
                      </div>
                    </button>
                  </div>
                  <div className="col my-3 d-flex justify-content-center">
                    <button
                      data-bs-toggle="collapse"
                      href="#information"
                      role="button"
                      aria-expanded="false"
                      aria-controls="information"
                      className="cta cta--orange"
                      onClick={() =>
                        setMarketingState({
                          ...marketingState,
                          tipoEnvio: "Envio personalizado",
                        })
                      }
                    >
                      <IconUI color={white} size={30}>
                        <CgTemplate />
                      </IconUI>
                      <div className="cta_text ps-2">Envio personalizado</div>
                      <span className="cta_text"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="collapse mt-3" id="information">
              <div className="card card-body">
                <div className="d-flex">
                  <div className="col-8">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci non ipsam maiores aut ut pariatur reprehenderit
                    necessitatibus laudantium, ad similique distinctio. Dolorem
                    nesciunt saepe qui, sunt modi blanditiis deleniti
                    aspernatur?
                  </div>
                  <div className="col-4 d-flex justify-content-center align-items-center">
                    <button className="cta cta--blue" onClick={netxitem}>
                      {marketingState.isLoading ? (
                        <div class="spinner-border text-success" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <span className="cta_text">Continuar</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
