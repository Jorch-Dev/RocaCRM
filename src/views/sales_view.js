import React, { Fragment } from "react";

export const Sales_view = () => {
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
    <Fragment>
      <div className="container-sm">
        <div className="row mx-5 my-5">
          <div className="col">
            Ventas
          </div>
        </div>
        <div className="row mx-5 my-5">
          <div className="col d-flex">
            <div className="col mx-3">
              <input
                type="email"
                class="form-control"
                id="txtNombre"
                placeholder="Escribe tu nombre"
              />
            </div>
            <div className="col mx-3">
              <input
                type="email"
                class="form-control"
                id="txtVentas"
                placeholder="name@example.com"
              />
            </div>
            <div className="col mx-3">
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
    </Fragment>
  );
};
