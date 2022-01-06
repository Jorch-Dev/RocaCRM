import React from "react";
import { IoMdContacts } from "react-icons/io";
import { BsCashStack } from "react-icons/bs";
import { Link, useRouteMatch } from "react-router-dom";
import { IconUI } from "../utils/IconUI";

export const VerticalBar_component = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className="d-none d-lg-block homemenu h-100">
      <div className="brand">
      <Link to="/home">
      <img src="/assets/rocacrm.jpeg" width="150" height="30" />
        {/* <div className="d-none d-lg-block text-dark text-bolder px-2">
          Roca CRM
        </div> */}
      </Link>
        
      </div>

      {/* <Link to={`${url}`}> */}
      <Link to="/contacts">
        <div className="homemenu_item text-grey-00 text-bold">
          <IconUI>
            <IoMdContacts />
          </IconUI>

          <div className="d-none d-lg-block  text-0  px-3">Contactos</div>
        </div>
      </Link>

      <Link to="/sales">
        <div className="homemenu_item text-grey-00 text-bold">
          <IconUI>
            <BsCashStack />
          </IconUI>

          <div className="d-none d-lg-block  text-0  px-3">Ventas</div>
        </div>
      </Link>

      {/* <div className="options_vertical navbar-white">
        <Link className="link--none" to="/contacts_view">
          <div className="option_vertical">
            <div className="icon">
              <IoMdContacts size="50" className="img-fluid" />
            </div>
          </div>
        </Link>

        <Link className="link--none" to="/sales_view">
          <div className="option_vertical">
            <div className="icon">
              <BsCashStack size="50" className="img-fluid" />
            </div>
          </div>
        </Link>
      </div> */}
    </div>
  );
};
