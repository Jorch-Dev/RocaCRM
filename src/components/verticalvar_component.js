import React, { Fragment } from "react";
import { IoMdContacts } from "react-icons/io";
import { BsCashStack } from "react-icons/bs";
import { Link } from "react-router-dom";

export const VerticalBar_component = () => {
  return (
    <Fragment>
      <div className="container_vertical shadow-sm">
        <div className="options_vertical">
          <Link className="link--none" to="/">
            <div className="option_vertical">
              <IoMdContacts size="50" />
              <p>Contactos</p>
            </div>
          </Link>
          <Link className="link--none" to="/">
            <div className="option_vertical">
              <BsCashStack size="50" />
              <p>Mis ventas</p>
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
