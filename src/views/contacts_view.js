import React, { Fragment } from "react";
import { TableContact_component } from "../components/tablecontact_component";

export const Contacts_view = () => {
  const objFunnels = [
    {
      Fun_ID: 1,
      Fun_Name: "Proyecto 1",
    },
    {
      Fun_ID: 2,
      Fun_Name: "Proyecto 2",
    },
    {
      Fun_ID: 3,
      Fun_Name: "Proyecto 3",
    },
    {
      Fun_ID: 4,
      Fun_Name: "Proyecto 4",
    },
    {
      Fun_ID: 5,
      Fun_Name: "Proyecto 4",
    },
  ];
  return (
    <>
      <div className="d-flex flex-column my-3">
        <div>
          <div className="col">
            <h1 className="mx-2 text-center">Contactos</h1>
          </div>
          <div className="row d-flex shadow bg-white mx-2 my-2 px-2 py-2 rounded">
            <div className="col">
              <input
                type="email"
                className="form-control"
                id="txtNombre"
                placeholder="Escribe tu nombre"
              />
            </div>
            <div className="col">
              <input
                type="email"
                className="form-control"
                id="txtVentas"
                placeholder="name@example.com"
              />
            </div>
            <div className="col">
              <select
                name="selectfunnels"
                id="selectfunnels"
                className="form-select"
              >
                <option value="0" defaultValue>
                  Busca tu proyecto
                </option>
                {objFunnels.map((i) => (
                  <option key={i.Fun_ID} value={i.Fun_ID}>
                    {i.Fun_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <div className="col d-flex justify-content-end mx-2">
                <div className="d-grid col-6 me-auto">
                  <button className="btn btn-primary">Buscar</button>
                </div>
                <div className="d-grid col-6 mx-2">
                  <button className="btn btn-success">Agregar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col shadow mx-2 my-2 ">
            <TableContact_component />
        </div>
      </div> 
    </>
  );
};
