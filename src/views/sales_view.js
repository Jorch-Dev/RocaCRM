import React from "react";
import { TableSales_component } from "../components/tablesales_component";
import { FiSearch } from "react-icons/fi";
import { IconUI } from "../utils/IconUI";
import { white } from "../styles/colors";
import { AddContactsView } from "./addcontacts_view";

export const Sales_view = () => {
  const obj = JSON.parse(localStorage.getItem("token"));

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
    <div className="contenedor-dashboard">
      <div className="d-flex flex-column">
        <div>
          <div className="col">
            <h1 className="mx-2 text-center">Ventas</h1>
          </div>

          <div className="row shadow bg-white mx-1 py-2">
            <div className="d-none d-sm-flex">
              <div className="col">
                <input
                  type="email"
                  className="form-input"
                  id="txtNombre"
                  placeholder="Escribe tu nombre"
                />
              </div>
              <div className="col">
                <input
                  type="email"
                  className="form-input"
                  id="txtVentas"
                  placeholder="name@example.com"
                />
              </div>
              <div className="col">
                <select
                  name="selectfunnels"
                  id="selectfunnels"
                  className="form-input"
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
              <div className="col d-none d-xl-flex justify-content-center align-items-center">
              <div className="col d-none d-xl-block position-relative">
                <button className="cta cta--icon cta--blue">
                  <div className="d-flex align-items-center">
                    <IconUI color={white}>
                      <FiSearch />
                    </IconUI>
                    <div className="cta_text ps-2">BUSCAR</div>
                  </div>
                </button>
              </div>

              <div className="col d-none d-xl-block position-relative">
                <button className="cta cta--icon cta--orange">
                  <div className="d-flex align-items-center">
                    <IconUI color={white}>
                      <FiSearch />
                    </IconUI>
                    <div className="cta_text ps-2">AGREGAR</div>
                  </div>
                </button>
              </div>
              </div>
              
            </div>

            <div className="d-sm-none">
              <div className="row gy-2">
                <div className="col pe-1 pt-1">
                  <input
                    type="email"
                    className="form-control"
                    id="txtNombre"
                    placeholder="Escribe tu nombre"
                  />
                </div>
                <div className="col pe-1 pt-1">
                  <input
                    type="email"
                    className="form-control"
                    id="txtVentas"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="col pe-1 pt-1">
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
              </div>

              <div className="row gy-2 mt-2">
                <button className="col cta cta--icon cta--blue">
                  <div className="cta_icon">
                    <div className="icon">
                      <FiSearch />
                    </div>
                  </div>
                  <div className="cta_text cta_text--white">BUSCAR</div>
                </button>
                <button className="col cta cta--icon cta--orange">
                  <div className="cta_icon">
                    <div className="icon">
                      <FiSearch />
                    </div>
                  </div>
                  <div className="cta_text cta_text--white">AGREGAR</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col shadow my-2">
          <TableSales_component />
        </div>
      </div>

      <div
        className="modal fade"
        id="addModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Estas agregando al contacto...
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{/* <AddContactsView /> */}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
