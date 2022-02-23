import React, { useContext, useState } from "react";
import { UserContext } from "../context/user_context";
import { BiMailSend, CgTemplate } from "react-icons/all";
import { IconUI } from "../utils/IconUI";
import { blue, white } from "../styles/colors";
import { MarketingContext } from "../context/emailmarketing_context";
import { NotificacionContext } from "../context/notification_context";
import { EmailEditorComponent } from "../components/emaileditor_component";

export const EmailMarketingView = () => {
  const { userState } = useContext(UserContext);
  const { showNotification } = useContext(NotificacionContext);
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
      showNotification(
        "error",
        "Email Marketing",
        "Debes de seleccionar un tipo",
        undefined,
        4
      );
      setMarketState({
        ...marketState,
        isLoading: false,
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
                    <b>correo electrónico</b> atractivo para tus clientes solo
                    selecciona un tipo.
                  </div>
                </div>
              </div>
            </div>

            <div className="cards mt-3">
              <div className="col d-flex justify-content-center">
                <div className="col-4 mx-2">
                  <div className="d-flex justify-content-center">
                    <IconUI color={blue} size={50}>
                      <BiMailSend />
                    </IconUI>
                  </div>

                  <div className="col bg-blue rounded-top">
                    <div className="col cta_text text-light d-flex justify-content-center ps-2">
                      Envio rapido
                    </div>
                  </div>
                  <div className="cards_panel">
                    <div className="d-flex flex-column">
                      <div className="m-2 text-secondary">
                        Almacenamiento <span>ilimitado</span>
                      </div>
                      <div className="m-2 text-secondary">
                        Ancho de banda <span>/60 GB</span>
                      </div>
                      <div className="m-2 text-secondary">
                        Alojamiento <span>Gratuito</span>
                      </div>
                      <div className="m-2 text-secondary">
                        <span>5</span> Embudos
                      </div>
                      <div className="m-2 text-secondary">
                        Plantillas <span>Gratuitas</span>
                      </div>
                      <div className="m-2 text-secondary">
                        Conexión de dominios personalizados
                      </div>
                      <div className="m-2 text-secondary">
                        Subdominio <span>Gratuito</span>
                      </div>
                      <div className="m-2 text-secondary">
                        500 <span>Contactos</span>
                      </div>

                      <button className="cta cta--blue" onClick={netxitem}>
                        <div className="cta_text cta_text--white">
                          Seleccionar
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-4 mx-2">
                  <div className="col">
                    <div className="d-flex justify-content-center">
                      <IconUI color={blue} size={50}>
                        <CgTemplate />
                      </IconUI>
                    </div>

                    <div className="col bg-blue rounded-top">
                      <div className="col cta_text text-light d-flex justify-content-center ps-2">
                        Envio personalizado
                      </div>
                    </div>
                  </div>
                  <div className="cards_panel">
                    <div className="d-flex flex-column">
                      <div className="m-2 text-secondary">
                        Almacenamiento <span>ilimitado</span>
                      </div>
                      <div className="m-2 text-secondary">
                        Ancho de banda <span>/60 GB</span>
                      </div>
                      <div className="m-2 text-secondary">
                        Alojamiento <span>Gratuito</span>
                      </div>
                      <div className="m-2 text-secondary">
                        <span>5</span> Embudos
                      </div>
                      <div className="m-2 text-secondary">
                        Plantillas <span>Gratuitas</span>
                      </div>
                      <div className="m-2 text-secondary">
                        Conexión de dominios personalizados
                      </div>
                      <div className="m-2 text-secondary">
                        Subdominio <span>Gratuito</span>
                      </div>
                      <div className="m-2 text-secondary">
                        500 <span>Contactos</span>
                      </div>

                      <button className="cta cta--blue" onClick={netxitem}>
                        <div className="cta_text cta_text--white">
                          Seleccionar
                        </div>
                      </button>
                    </div>
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
