import React, { useContext } from "react";
import {
  AiFillHome,
  BsPersonFill,
} from "react-icons/all";
import { UserContext } from "../context/user_context";
import { IconUI } from "../utils/IconUI";

export const Navbar_view = () => {
  const { userState, setUserState } = useContext(UserContext);


  return (
    //bg-blue
    <nav className="topnav navbar-white bottom-shadow">
      <div className="container-fluid">
        <div className="d-none d-sm-flex mt-2">

          <div className="ms-auto d-flex mt-2">
            <div className="snack text-bold text-blue">
              <IconUI size={16}>
                <BsPersonFill />
              </IconUI>
              {userState.usuario !== null ? (
                <span className="mx-2 text-0">
                  {userState.usuario.Usr_Name} {userState.usuario.Usr_Lastname}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="w-100 d-sm-none">
          <div className="d-flex">
            {/* <div className="snack">
              <IconUI size={32}>
                <AiFillHome />
              </IconUI>
              <span className="mx-2 text-0">Home Roca Funnels</span>
            </div> */}

            <div className="snack text-bold text-blue mt-2 ms-auto">
              <IconUI size={16}>
                <BsPersonFill />
              </IconUI>
              {userState.usuario !== null ? (
                <span className="mx-2 text-0">
                  {userState.usuario.Usr_Name} {userState.usuario.Usr_Lastname}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
