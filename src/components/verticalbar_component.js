import React, { useContext } from "react";
import { IoMdContacts, AiOutlinePoweroff, BsCashStack, SiMarketo } from "react-icons/all";
import { Link, useRouteMatch } from "react-router-dom";
import { IconUI } from "../utils/IconUI";
import { UserContext } from "../context/user_context";

export const VerticalBar_component = () => {
  const { path, url } = useRouteMatch();

  const { _logOut } = useContext(UserContext);

  return (
    <div className="homemenu h-100">
      <div className="brand">
        <Link to={`${url}`}>
          <img src="/assets/rocacrm.jpeg" width="150" height="30" className="d-none d-lg-block" />
          {/* <div className="d-none d-lg-block text-dark text-bolder px-2">
          Roca CRM
        </div> */}
        </Link>
      </div>

      {/* <Link to={`${url}`}> */}
      <Link to={`${url}`}>
        <div className="homemenu_item">
          <IconUI>
            <IoMdContacts />
          </IconUI>

          <div className="d-none d-lg-block  text-0  px-3">Contactos</div>
        </div>
      </Link>

      <Link to={`${url}/sales`}>
        <div className="homemenu_item">
          <IconUI>
            <BsCashStack />
          </IconUI>

          <div className="d-none d-lg-block text-0 px-3">Ventas</div>
        </div>
      </Link>

      <Link to={`${url}/EmailMarketing`}>
        <div className="homemenu_item">
          <IconUI>
            <SiMarketo />
          </IconUI>

          <div className="d-none d-lg-block text-0 px-3">Email Marketing</div>
        </div>
      </Link>

      <div
        className="homemenu_item mt-auto"
        onClick={() => {
          _logOut();
        }}
      >
        <IconUI>
          <AiOutlinePoweroff />
        </IconUI>
        <div className="d-none d-lg-block text-0 px-3">Salir</div>
      </div>
    </div>
  );
};
