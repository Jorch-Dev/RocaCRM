import React, { Fragment } from "react";
import { IoMdContacts } from "react-icons/io";
import { BsCashStack } from "react-icons/bs";
import { Link } from "react-router-dom";


export const VerticalBar_component = () => {

  return (


        <div className="container_vertical shadow-sm">

          <div className="options_vertical">
            <Link className="link--none" to="/contacts_view">
              <div
                className="option_vertical"
              >
                <IoMdContacts size="50" className="img-fluid" />
                <p>Contactos</p>
              </div>
            </Link>

            <Link className="link--none" to="/sales_view">
              <div
                className="option_vertical"
              >
                <BsCashStack size="50" className="img-fluid" />
                <p>Mis ventas</p>
              </div>
            </Link>
          </div>
        </div>

      

  );
};
