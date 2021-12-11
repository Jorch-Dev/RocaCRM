import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { ApiService } from "../services/api_service";

export const EditContactsView = ({ data, setData, body, setBody }) => {
  console.log(data);
  const [userEdit, setUserEdit] = useState({
    Con_Address1: "",
    Con_Address2: "",
    Con_AffiliateOf: "null",
    Con_Birthday: "",
    Con_City: "",
    Con_Country: "",
    Con_Email: "",
    Con_Lastname: "",
    Con_Name: "",
    Con_Phone: "",
    Con_PostalCode: "",
    Con_State: "",
    Con_Status: "",
    Fun_ID: 0,
    createdAt: "",
    updatedAt: "",
    error: null,
  });

  const actualizanombre = (e) =>
    setUserEdit({ ...userEdit, Con_Name: e.target.value });
  const actualizapellido = (e) =>
    setUserEdit({ ...userEdit, Con_Lastname: e.target.value });
  const actualizacorreo = (e) =>
    setUserEdit({ ...userEdit, Con_Email: e.target.value });
  const actualizatelefono = (e) =>
    setUserEdit({ ...userEdit, Con_Phone: e.target.value });
  const actualizadirec1 = (e) =>
    setUserEdit({ ...userEdit, Con_Address1: e.target.value });
  const actualizadirec2 = (e) =>
    setUserEdit({ ...userEdit, Con_Address2: e.target.value });
  const actualizaciudad = (e) =>
    setUserEdit({ ...userEdit, Con_City: e.target.value });
  const actualizaestado = (e) =>
    setUserEdit({ ...userEdit, Con_State: e.target.value });
  const actualizacp = (e) =>
    setUserEdit({ ...userEdit, Con_PostalCode: e.target.value });
  const actualizapais = (e) =>
    setUserEdit({ ...userEdit, Con_Country: e.target.value });
  const actualizabirthday = (e) =>
    setUserEdit({ ...userEdit, Con_Birthday: e.target.value });

  const guardaEditar = async () => {
    setData({ ...data, isLoading: true });
    const obj = JSON.stringify({
      Con_Name: userEdit.Con_Name,
      Con_Lastname: userEdit.Con_Lastname,
      Con_Email: userEdit.Con_Email,
      Con_Phone: userEdit.Con_Phone,
      Con_Address1: userEdit.Con_Address1,
      Con_Address2: userEdit.Con_Address2,
      Con_City: userEdit.Con_City,
      Con_State: userEdit.Con_State,
      Con_PostalCode: userEdit.Con_PostalCode,
      Con_Country: userEdit.Con_Country,
      Con_Birthday: userEdit.Con_Birthday,
    });

    let id = data.objetoUsuario.Con_ID;
    let idFun = data.objetoUsuario.Fun_ID;
    let metod = "put";
    let resource = `user/contact/${id}?f=${idFun}`;
    const result = await ApiService(metod, resource, obj);
    
    if (result === 401) {
      setUserEdit({
        ...userEdit,
        error:
          "Ocurrio un error, si el error persiste contacte a un administrador.",
      });
    }else{
      setBody({ ...body, isLoading: false });
    }
  };

  // const llenaContactos = async (e) => {
  //   if (data.idFunel != 0) {
  //     let id = data.idFunel;
  //     let metod = "get";
  //     let resource = `user/contact?f=${id}`;
  //     const result = await ApiService(metod, resource);
  //     console.log(result)
  //     //stateData({ ...data, contactos: result.data.rows, idFunel: id });
  //   } else {
  //     stateData({
  //       ...data,
  //       error:
  //         "Debes escojer un proyecto para poder visualizar los contactos que pertenecen a el",
  //     });
  //   }
  // };

  return (
    <>
      <div className="container">
        {userEdit.error != null ? (
          <p className="text-center text-orange">{userEdit.error}</p>
        ) : (
          <></>
        )}
        <div className="row gy-2">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              onChange={actualizanombre}
              value={data.objetoUsuario.Con_Name}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Apellidos"
              onChange={actualizapellido}
              value={data.objetoUsuario.Con_Lastname}
            />
          </div>
        </div>
        <div className="row d-flex flex-column gy-2 mt-1">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Correo Electrónico"
              onChange={actualizacorreo}
              value={data.objetoUsuario.Con_Email}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Télefono"
              onChange={actualizatelefono}
              value={data.objetoUsuario.Con_Phone}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Dirección 1"
              onChange={actualizadirec1}
              value={data.objetoUsuario.Con_Address1}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Dirección 2"
              onChange={actualizadirec2}
              value={data.objetoUsuario.Con_Address2}
            />
          </div>
        </div>

        <div className="row gy-2 mt-1">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Ciudad"
              onChange={actualizaciudad}
              value={data.objetoUsuario.Con_City}
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Estado"
              onChange={actualizaestado}
              value={data.objetoUsuario.Con_State}
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Código postal"
              onChange={actualizacp}
              value={data.objetoUsuario.Con_PostalCode}
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="País"
              onChange={actualizapais}
              value={data.objetoUsuario.Con_Country}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="Fecha de nacimiento"
              onChange={actualizabirthday}
              value={data.objetoUsuario.Con_Birthday}
            />
          </div>
        </div>
      </div>
      <br></br>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary d-flex"
          onClick={guardaEditar}
        >
          {data.isLoading ? (
            <>
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
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
