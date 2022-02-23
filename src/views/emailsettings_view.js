import React, { useState, useRef, useContext } from "react";
import { AiOutlineSave, BiEdit, SiIconify } from "react-icons/all";
import { IconUI } from "../utils/IconUI";
import { white } from "../styles/colors";
import { MarketingContext } from "../context/emailmarketing_context";
import { NotificacionContext } from "../context/notification_context";
import Picker from "emoji-picker-react";

export const EmailSettingsView = ({modal, setModal}) => {
  const inputEmoji = useRef(null);
  const { marketingState, setMarketingState } = useContext(MarketingContext);
  const { showNotification } = useContext(NotificacionContext);
  const [emailsettings, seEmailSettings] = useState({
    remitente: "",
    emailremitente: "",
    asunto: "",
    error: null,
    isLoading: false,
    chosenEmoji: false,
  });

  const addicon = (e) => {
    e = emailsettings.chosenEmoji ? false : true;

    seEmailSettings({ ...emailsettings, chosenEmoji: e });
  };

  const onEmojiClick = (e, emojiObject) => {
    const { selectionStart, selectionEnd } = inputEmoji.current;

    const newVal =
      emailsettings.asunto.slice(0, selectionStart) +
      emojiObject.emoji +
      emailsettings.asunto.slice(selectionEnd);
    seEmailSettings({ ...emailsettings, asunto: newVal });
  };

  const savesettings = () => {
    seEmailSettings({ ...emailsettings, isLoading: true});
    if (emailsettings.remitente === "") {
      showNotification(
        "error",
        "Configuración avanzada",
        "El campo remitente no puede estar vacio",
        undefined,
        4
      );
      seEmailSettings({
        ...emailsettings,
        isLoading: false,
      });
      return;
    }
    if (emailsettings.emailremitente === "") {
      showNotification(
        "error",
        "Configuración avanzada",
        "El campo email del remitente no puede estar vacio",
        undefined,
        4
      );
      seEmailSettings({
        ...emailsettings,
        isLoading: false,
      });
      return;
    }
    if (emailsettings.asunto === "") {
      showNotification(
        "error",
        "Configuración avanzada",
        "El campo asunto no puede estar vacio",
        undefined,
        4
      );
      seEmailSettings({
        ...emailsettings,
        isLoading: false,
      });
      return;
    }

    if (marketingState.emailSettings) {
      setMarketingState({
        ...marketingState,
        objetoSettings: {
          remitente: emailsettings.remitente,
          emailremitente: emailsettings.emailremitente,
          asunto: emailsettings.asunto,
        },
      })
      seEmailSettings({ ...emailsettings, isLoading: false, error: "" })
      setModal({...modal, modalIsOpen: false})
    }

    

    //const myTimeout = setTimeout(), 5000);
    
  };

  return (
    <>
      <div className="modal-body">
        <div className="container">
          {emailsettings.error != null ? (
            <p className="text-center text-orange">{emailsettings.error}</p>
          ) : (
            <></>
          )}
          <div className="d-flex flex-column mt-1">
            <div className="col">
              <div class="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del remitente"
                  onChange={(evt) => {
                    seEmailSettings({
                      ...emailsettings,
                      remitente: evt.currentTarget.value,
                    });
                  }}
                  value={emailsettings.remitente}
                />
                <span className="input-group-text cursor-pointer">
                  <IconUI size={20}>
                    <BiEdit />
                  </IconUI>
                </span>
              </div>
            </div>
            <div className="col">
              <div class="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email del remitente"
                  onChange={(evt) => {
                    seEmailSettings({
                      ...emailsettings,
                      emailremitente: evt.currentTarget.value,
                    });
                  }}
                  value={emailsettings.emailremitente}
                />
                <span className="input-group-text cursor-pointer">
                  <IconUI size={20}>
                    <BiEdit />
                  </IconUI>
                </span>
              </div>
            </div>
          </div>
          <div className="row d-flex flex-column mt-1">
            <div className="col">
              <div class="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Asunto del correo"
                  ref={inputEmoji}
                  onChange={(evt) => {
                    seEmailSettings({
                      ...emailsettings,
                      asunto: evt.currentTarget.value,
                    });
                  }}
                  value={emailsettings.asunto}
                />
                <span
                  className="input-group-text cursor-pointer me-1"
                  onClick={() => addicon(true)}
                >
                  <IconUI size={20}>
                    <SiIconify />
                  </IconUI>
                </span>
                <span className="input-group-text cursor-pointer">
                  <IconUI size={20}>
                    <BiEdit />
                  </IconUI>
                </span>
              </div>
            </div>
            <div className="d-flex">
              <div className="ms-auto">
                {emailsettings.chosenEmoji ? (
                  <Picker onEmojiClick={onEmojiClick} />
                ) : (
                  <> </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="cta cta--blue" onClick={savesettings}>
          {emailsettings.isLoading ? (
            <>
            <div className="col d-flex">
              <div className="col d-flex justify-content-center align-items-center cta_icon">
                <IconUI color={white}>
                  <AiOutlineSave />
                </IconUI>
              </div>
              <div className="col d-flex justify-content-center align-items-center cta_text cta_text--white">GUARDAR</div>
              <div
                  className="spinner-border text-light ms-1"
                  role="status"
                >
                  <span className="visually-hidden">loading...</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col d-flex">
                <div className="col d-flex justify-content-center align-items-center cta_icon">
                  <IconUI color={white}>
                    <AiOutlineSave />
                  </IconUI>
                </div>

                <div className="col d-flex justify-content-center align-items-center cta_text cta_text--white">
                  GUARDAR
                </div>
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
};
