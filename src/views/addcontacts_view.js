import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { ApiService } from "../services/api_service";

export const AddContactsView = ({ data, stateData }) => {
  const [stateuser, setStateuser] = useState({
    name: "",
    lasName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    cp: "",
    country: "",
    birthday: "",
    error: null,
  });
  //#region llena Datos
  const actualizaname = (e) => {
    setStateuser({ ...stateuser, name: e.target.value });
  };
  const actualizaLasname = (e) => {
    setStateuser({ ...stateuser, lasName: e.target.value });
  };
  const actualizaemail = (e) => {
    setStateuser({ ...stateuser, email: e.target.value });
  };
  const actualizaphone = (e) => {
    setStateuser({ ...stateuser, phone: e.target.value });
  };
  const actualizaaddress1 = (e) => {
    setStateuser({ ...stateuser, address1: e.target.value });
  };
  const actualizaaddress2 = (e) => {
    setStateuser({ ...stateuser, address2: e.target.value });
  };
  const actualizacity = (e) => {
    setStateuser({ ...stateuser, city: e.target.value });
  };
  const actualizastate = (e) => {
    setStateuser({ ...stateuser, state: e.target.value });
  };
  const actualizacp = (e) => {
    setStateuser({ ...stateuser, cp: e.target.value });
  };
  const actualizacountry = (e) => {
    setStateuser({ ...stateuser, country: e.target.value });
  };
  const actualizadate = (e) => {
    setStateuser({ ...stateuser, birthday: e.target.value });
  };
  //#endregion

  const saveContac = async () => {
    stateData({ ...data, isLoading: true });
    if (stateuser.name === "") {
      setStateuser({
        ...stateuser,
        error: "El campo nombre no puede estar vacio",
      });
      stateData({ ...data, isLoading: false });
      return;
    }
    if (stateuser.email === "") {
      setStateuser({
        ...stateuser,
        error: "El campo Correo electrónico no puede estar vacio",
      });
      stateData({ ...data, isLoading: false });
      return;
    }
    let regext =
      /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/;
    if (!regext.test(stateuser.email)) {
      setStateuser({
        ...stateuser,
        email: "",
        error:
          "Ingresa el correo electrónico que diste de alta al momento de registrarte en el sistema",
      });
      return;
    }
    if (stateuser.phone === "") {
      setStateuser({
        ...stateuser,
        error: "El campo Teléfono no puede estar vacio",
      });
      stateData({ ...data, isLoading: false });
      return;
    }
    const obj = JSON.stringify({
      Con_Name: stateuser.name,
      Con_Lastname: stateuser.lastName,
      Con_Email: stateuser.email,
      Con_Phone: stateuser.phone,
      Con_Address1: stateuser.address1,
      Con_Address2: stateuser.address2,
      Con_City: stateuser.city,
      Con_State: stateuser.state,
      Con_PostalCode: stateuser.cp,
      Con_Country: stateuser.country,
      Con_Birthday: stateuser.birthday,
    });
    let id = data.idFunel;
    let method = "post";
    let resource = `user/contact?f=${id}`;

    const result = await ApiService(method, resource, obj);
    if (result != null) {
      await llenaContactos()
      stateData({ ...data, isLoading: false, modalIsOpen: false });
    }
  };

  const llenaContactos = async (e) => {
    if (data.idFunel != 0) {
      let id = data.idFunel;
      let metod = "get";
      let resource = `user/contact?f=${id}`;
      const result = await ApiService(metod, resource);
      console.log(result)
      //stateData({ ...data, contactos: result.data.rows, idFunel: id });
    } else {
      stateData({
        ...data,
        error:
          "Debes escojer un proyecto para poder visualizar los contactos que pertenecen a el",
      });
    }
  };

  return (
    <>
      <div className="modal-body">
        <div className="container">
          {stateuser.error != null ? (
            <p className="text-center text-orange">{stateuser.error}</p>
          ) : (
            <></>
          )}
          <div className="row gy-2">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                onChange={actualizaname}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Apellidos"
                onChange={actualizaLasname}
              />
            </div>
          </div>
          <div className="row d-flex flex-column gy-2 mt-1">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Correo Electrónico"
                onChange={actualizaemail}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Télefono"
                onChange={actualizaphone}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Dirección 1"
                onChange={actualizaaddress1}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Dirección 2"
                onChange={actualizaaddress2}
              />
            </div>
          </div>

          <div className="row gy-2 mt-1">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Ciudad"
                onChange={actualizacity}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Estado"
                onChange={actualizastate}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Código postal"
                onChange={actualizacp}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="País"
                onChange={actualizacountry}
              />
            </div>
            <div className="col">
              <input
                type="date"
                className="form-control"
                placeholder="Fecha de nacimiento"
                onChange={actualizadate}
              />
            </div>
          </div>

          <div className="col"></div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="cta cta--blue" onClick={saveContac}>
          {data.isLoading ? (
            <>
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">loading...</span>
              </div>
            </>
          ) : (
            <>
              <div className="cta_icon">
                <AiOutlineSave />
              </div>
              <div className="cta_text cta_text--white">GUARDAR</div>
            </>
          )}
        </button>
      </div>
    </>
  );
};
