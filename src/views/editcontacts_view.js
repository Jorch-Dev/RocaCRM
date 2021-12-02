import React from "react";

export const EditContactsView = () => {
  return (
    <>
      <div className="container">
        <div className="row gy-2">
          <div className="col">
            <input type="text" className="form-control" placeholder="Nombre" />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Apellidos"
            />
          </div>
        </div>
        <div className="row d-flex flex-column gy-2 mt-1">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Correo Electrónico"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Télefono"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Dirección 1"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Dirección 2"
            />
          </div>
        </div>

        <div className="row gy-2 mt-1">
          <div className="col-6">
            <input type="text" className="form-control" placeholder="Ciudad" />
          </div>
          <div className="col-6">
            <input type="text" className="form-control" placeholder="Estado" />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Código postal"
            />
          </div>
          <div className="col-6">
            <input type="text" className="form-control" placeholder="País" />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="Fecha de nacimiento"
            />
          </div>
        </div>

        <div className="col"></div>
      </div>
      {/* </div> */}
    </>
  );
};
