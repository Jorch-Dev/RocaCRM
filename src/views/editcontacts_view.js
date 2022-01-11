import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { ApiService } from "../services/api_service";
import { IconUI } from "../utils/IconUI";
import { white } from "../styles/colors";

export const EditContactsView = ({ data, setData, onEditUser }) => {

  const [userEdit, setUserEdit] = useState({
    ...data.objetoUsuario,
    error: null,
  });

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

    let id = userEdit.Con_ID;

    let idFun = userEdit.Fun_ID;
    let metod = "put";
    let resource = `user/contact/${id}?f=${idFun}`;
    let result = await ApiService(metod, resource, obj);
    
    if (result.status !== 200) {
      setUserEdit({
        ...userEdit,
        error:
        "Error del sistema, intente de nuevo más tarde o comuníquese con un asesor",
      });
      setData({ ...data, isLoading: false, modalIsOpen: false });
    }else{
      onEditUser(userEdit)
    }
  };

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
              onChange={ (evt) => {
                setUserEdit({...userEdit, Con_Name:evt.currentTarget.value})
              }}
              value={userEdit.Con_Name !== null ? userEdit.Con_Name : ''}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Apellidos"
              onChange={ (evt) => {
                setUserEdit({...userEdit, Con_Lastname:evt.currentTarget.value})
              }}
              value={userEdit.Con_Lastname !== null ? userEdit.Con_Lastname : ''}
            />
          </div>
        </div>
        <div className="row d-flex flex-column gy-2 mt-1">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Correo Electrónico"
              onChange={ (evt) => {
                setUserEdit({...userEdit, Con_Email:evt.currentTarget.value})
              }}
              value={userEdit.Con_Email !== null ? userEdit.Con_Email : ''}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Télefono"
              onChange={ (evt) => {
                setUserEdit({...userEdit, Con_Phone:evt.currentTarget.value})
              }}
              value={userEdit.Con_Phone !== null ? userEdit.Con_Phone : ''}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Dirección 1"
              onChange={ (evt) => {
                setUserEdit({...userEdit, Con_Address1:evt.currentTarget.value})
              }}
              value={userEdit.Con_Address1 !== null ? userEdit.Con_Address1 : ''}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Dirección 2"
              onChange={ (evt) => {
                setUserEdit({...userEdit, Con_Address2:evt.currentTarget.value})
              }}
              value={userEdit.Con_Address2 !== null ? userEdit.Con_Address2 : ''}
            />
          </div>
        </div>

        <div className="row gy-2 mt-1">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Ciudad"
              onChange={ (evt) => {
                setUserEdit({...userEdit, Con_City:evt.currentTarget.value})
              }}
              value={userEdit.Con_City !== null ? userEdit.Con_City : ''}
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Estado"
              onChange={ (evt) => {
                console.log(evt.currentTarget.value)
                setUserEdit({...userEdit, Con_State:evt.currentTarget.value})
              }}
              value={userEdit.Con_State !== null ? userEdit.Con_State : ''}
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Código postal"
              onChange={ (evt) => {
                setUserEdit({...userEdit, Con_PostalCode:evt.currentTarget.value})
              }}
              value={userEdit.Con_PostalCode !== null ? userEdit.Con_PostalCode : ''}
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="País"
              onChange={ (evt) => {
                setUserEdit({...userEdit, Con_Country:evt.currentTarget.value})
              }}
              value={userEdit.Con_Country !== null ? userEdit.Con_Country : ''}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="Fecha de nacimiento"
              onChange={ (evt) => {
                setUserEdit({...userEdit, Con_Birthday:evt.currentTarget.value})
              }}
              value={userEdit.Con_Birthday !== null ? userEdit.Con_Birthday : ''}
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
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          ) : (
            <>
              <div className="cta_icon mt-1">
              <IconUI color={white}>
                <AiOutlineSave />
                </IconUI>
              </div>
              <div className="cta_text cta_text--white">GUARDAR</div>
            </>
          )}
        </button>
      </div>
    </>
  );
};
