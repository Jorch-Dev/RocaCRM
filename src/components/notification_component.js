import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { NotificacionContext } from "../context/notification_context";
import {
  IoClose,
  HiCheckCircle,
  MdError,
  IoIosWarning,
  FaRegQuestionCircle,
} from "react-icons/all";
import { IconUI } from "../utils/IconUI";
import { gray30, green, lightBlue, lightOrange } from "../styles/colors";

function createMarkup(text) {
  return { __html: text };
}
export const NotificationComponent = () => {
  const { notificacionState, closeNotification, onContinue } =
    useContext(NotificacionContext);

  const notificacionType = (type) => {
    switch (type) {
      case "success":
        return (
          <IconUI color={green} size={24}>
            <HiCheckCircle />
          </IconUI>
        );
      case "error":
        return (
          <IconUI color={"red"} size={24}>
            <MdError />
          </IconUI>
        );
      case "warning":
        return (
          <IconUI color={lightOrange} size={24}>
            <IoIosWarning />
          </IconUI>
        );
      case "option":
        return (
          <IconUI color={lightBlue} size={24}>
            <FaRegQuestionCircle />
          </IconUI>
        );

      default:
        return null;
    }
  };

  return (
    <CSSTransition
      in={notificacionState.show}
      timeout={5}
      classNames="my-node"
      unmountOnExit
    >
      <div className={`notificacion notificacion--${notificacionState.type}`}>
        {/* icon */}

        <div className="cursor-pointer mx-3">
          {notificacionType(notificacionState.type)}
        </div>

        {/* titulo y el texto */}
        <div className="w-100">
          <div className="text-bold">{notificacionState.title}</div>
          <div
            dangerouslySetInnerHTML={createMarkup(notificacionState.note)}
            className="text-small text-secondary"
          ></div>

          {notificacionState.type === "option" ? (
            <div className="d-flex pb-2 mt-3">
              <div
                className="cursor-pointer text-small text-secondary"
                onClick={() => {
                  closeNotification();
                }}
              >
                Cancelar
              </div>
              <div
                className="cursor-pointer text-small text-bold text-blue px-3"
                onClick={() => {
                  onContinue();
                }}
              >
                Continuar
              </div>
            </div>
          ) : null}
        </div>

        <div className="col"></div>

        {notificacionState.type !== "option" ? (
          <div
            className="cursor-pointer ms-4 me-3"
            onClick={() => {
              closeNotification();
            }}
          >
            <IconUI color={gray30} size={24}>
              <IoClose />
            </IconUI>
          </div>
        ) : null}
      </div>
    </CSSTransition>
  );
}
