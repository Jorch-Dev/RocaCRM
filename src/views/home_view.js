import React, { Fragment } from "react";
import { Navbar_view } from "../components/navbar_component";
import { VerticalBar_component } from "../components/verticalbar_component";

export const Home_view = () => {
  return (
    <Fragment>
      <Navbar_view />
      <VerticalBar_component />
    </Fragment>
  );
};
