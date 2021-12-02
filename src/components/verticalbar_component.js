import React from "react";
import { IoMdContacts } from "react-icons/io";
import { BsCashStack } from "react-icons/bs";
import { Link } from "react-router-dom";

export const VerticalBar_component = () => {
  return (
    <nav className="container_vertical shadow-sm d-none d-lg-block navbar--blue">
      <div className="options_vertical">
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
      </div>
    </nav>
  );
};
