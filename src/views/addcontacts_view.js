import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { ApiService } from "../services/api_service";
import { IconUI } from "../utils/IconUI";
import { white } from "../styles/colors";
import { DotLoader } from "../components/dotloader_component";

export const AddContactsView = ({ data, stateData, onAddUser }) => {
  const [stateuser, setStateuser] = useState({
    Con_Name: "",
    Con_Lastname: "",
    Con_Email: "",
    Con_Phone: "",
    Con_Address1: "",
    Con_Address2: "",
    Con_City: "",
    Con_State: "",
    Con_PostalCode: "",
    Con_Country: "",
    Con_Birthday: "",
    con_Tag: "",
    error: null,
    isLoading: false,
  });

  const saveContac = async () => {
    stateData({ ...data, isLoading: true });
    if (stateuser.Con_Name === "") {
      setStateuser({
        ...stateuser,
        error: "El campo nombre no puede estar vacio",
      });
      stateData({ ...data, isLoading: false });
      return;
    }
    if (stateuser.Con_Email === "") {
      setStateuser({
        ...stateuser,
        error: "El campo Correo electrónico no puede estar vacio",
      });
      stateData({ ...data, isLoading: false });
      return;
    }
    let regext =
      /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/;
    if (!regext.test(stateuser.Con_Email)) {
      setStateuser({
        ...stateuser,
        Con_Email: "",
        error: "el formato de Correo Electrónico no es el correcto",
      });
      stateData({ ...data, isLoading: false });
      return;
    }
    if (stateuser.Con_Phone === "") {
      setStateuser({
        ...stateuser,
        error: "El campo Teléfono no puede estar vacio",
      });
      stateData({ ...data, isLoading: false });
      return;
    }
    const obj = JSON.stringify({
      Con_Name: stateuser.Con_Name,
      Con_Lastname: stateuser.Con_Lastname,
      Con_Email: stateuser.Con_Email,
      Con_Phone: stateuser.Con_Phone,
      Con_Address1: stateuser.Con_Address1,
      Con_Address2: stateuser.Con_Address2,
      Con_AffiliateOf: null,
      Con_City: stateuser.Con_City,
      Con_State: stateuser.Con_State,
      Con_PostalCode: stateuser.Con_PostalCode,
      Con_Country: stateuser.Con_Country,
      Con_Birthday: stateuser.Con_Birthday,
    });
    let id = data.idFunel;
    let method = "post";
    let resource = `user/contact?f=${id}&o=0&i=100`;

    const result = await ApiService(method, resource, obj);

    if (result.status !== 201) {
      setStateuser({
        ...stateuser,
        error: result.data.error.msg,
      });
      stateData({ ...data, isLoading: false });
    } else {
      onAddUser(result.data);
      stateData({ ...data, modalIsOpen: false });
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
                onChange={(evt) => {
                  setStateuser({
                    ...stateuser,
                    Con_Name: evt.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Apellidos"
                onChange={(evt) => {
                  setStateuser({
                    ...stateuser,
                    Con_Lastname: evt.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="row d-flex flex-column gy-2 mt-1">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Correo Electrónico"
                onChange={(evt) => {
                  setStateuser({
                    ...stateuser,
                    Con_Email: evt.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Télefono"
                onChange={(evt) => {
                  setStateuser({
                    ...stateuser,
                    Con_Phone: evt.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Dirección 1"
                onChange={(evt) => {
                  setStateuser({
                    ...stateuser,
                    Con_Address1: evt.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Dirección 2"
                onChange={(evt) => {
                  setStateuser({
                    ...stateuser,
                    Con_Address2: evt.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="row gy-2 mt-1">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Ciudad"
                onChange={(evt) => {
                  setStateuser({
                    ...stateuser,
                    Con_City: evt.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Estado"
                onChange={(evt) => {
                  setStateuser({
                    ...stateuser,
                    Con_State: evt.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Código postal"
                onChange={(evt) => {
                  setStateuser({
                    ...stateuser,
                    Con_PostalCode: evt.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="País"
                onChange={(evt) => {
                  setStateuser({
                    ...stateuser,
                    Con_Country: evt.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="d-flex flex-column">
              <div className="col">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Fecha de nacimiento"
                  onChange={(evt) => {
                    setStateuser({
                      ...stateuser,
                      Con_Birthday: evt.currentTarget.value,
                    });
                  }}
                />
              </div>
              <div className="col mt-2">
                <select
                  name="selectfunnels"
                  id="selectfunnels"
                  className="form-control"
                  onChange={(evt) => {
                    setStateuser({
                      ...stateuser,
                      con_Tag: evt.currentTarget.value,
                    });
                  }}
                >
                  <option value="0" defaultValue>
                    Agregale una etiqueta
                  </option>

                  {data.listTags.map((i, j) => (
                    <option key={j} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col"></div>
        </div>
      </div>
      <div className="modal-footer">
        {stateuser.isLoading ? (
          <button className="cta_loader cta--blue">
            <DotLoader />
          </button>
        ) : (
          <button className="cta cta--blue" onClick={saveContac}>
            <div className="cta_icon mt-1">
              <IconUI color={white}>
                <AiOutlineSave />
              </IconUI>
            </div>
            <div className="cta_text cta_text--white">GUARDAR</div>
          </button>
        )}
      </div>
    </>
  );
};
