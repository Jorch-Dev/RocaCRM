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
      <div className="container-fluid d-flex flex-column h-100 p-0 bs-blue">
        <div>
          <div className="col">
            <h1 className="mx-2">Contactos</h1>
          </div>
          <div className="row mx-2 my-3 d-flex p-2 shadow-sm columna--white">
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
        <div className="col">
          <div className="row mx-2 d-flex p-2 shadow-sm columna--white">
            <TableContact_component />
          </div>
        </div>
      </div>

      {/* <TableContact_component /> */}
      {/* <div className="container container-sm">
        <div className="row mx-5 my-5">
          <div className="col">Contactos</div>
        </div>
        <div className="row mx-5 my-5 p-3 col--white shadow-sm">
          <div className="col d-flex">
            <div className="col mx-3">
             
            </div>
            <div className="col mx-3">
              
            </div>
            <div className="col mx-3">
              
            </div>
            
          </div>
        </div>
        <div className="row mx-5 my-5 row-cols-1 row-cols-sm-2 row-cols-md-4">
          
        </div>
      </div> */}
    </>
  );
};
