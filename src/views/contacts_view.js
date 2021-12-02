import React, {useEffect} from "react";
import { TableContact_component } from "../components/tablecontact_component";
import { FiSearch } from "react-icons/fi";
import { AddContactsView } from "./addcontacts_view"
import { useHistory } from "react-router-dom";

export const Contacts_view = () => {
  let history = useHistory();
  const obj = JSON.parse(localStorage.getItem("token"));
  // useEffect(() => {
  //   if (obj.token !== null) {
  //     history.replace("/home");
  //   } 
  // }, [obj]);

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
            <h1 className="mx-2 text-center">Contactos</h1>
          </div>

          <div className="row shadow bg-white mx-1 py-2">
            <div className="d-none d-sm-flex">
              <div className="col">
                <input
                  type="email"
                  className="form-input_text"
                  id="txtNombre"
                  placeholder="Escribe tu nombre"
                />
              </div>
              <div className="col">
                <input
                  type="email"
                  className="form-input_text"
                  id="txtVentas"
                  placeholder="name@example.com"
                />
              </div>
              <div className="col">
                <select
                  name="selectfunnels"
                  id="selectfunnels"
                  className="form-input_select"
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
              <button className="cta cta--icon cta--blue">
                <div className="cta_icon">
                  <div className="icon">
                    <FiSearch />
                  </div>
                </div>
                <div className="cta_text cta_text--white">BUSCAR</div>
              </button>
              <button className="cta cta--icon cta--orange">
                <div className="cta_icon">
                  <div className="icon">
                    <FiSearch />
                  </div>
                </div>
                <div data-bs-toggle="modal" data-bs-target="#addModal">
                  <div className="cta_text cta_text--white">AGREGAR</div>
                </div>
              </button>
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
          <TableContact_component />
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
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <AddContactsView />
            </div>
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
