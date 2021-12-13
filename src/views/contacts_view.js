import React, { useState, useEffect } from "react";
import { TableContact_component } from "../components/tablecontact_component";
import { FiSearch } from "react-icons/fi";
import { RiFileExcel2Line } from "react-icons/ri";
import { AddContactsView } from "./addcontacts_view";
import { ApiService } from "../services/api_service";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import Modal from "react-bootstrap/Modal";

export const Contacts_view = () => {
  const obj = JSON.parse(localStorage.getItem("token"));
  const [stateAdd, setStateAdd] = useState({
    columns: [
      { id: 1, code: "name", label: "Nombre", minWidth: 100 },
      { id: 2, code: "lasName", label: "Apellido", minWidth: 100 },
      { id: 3, code: "email", label: "Email", minWidth: 100 },
      { id: 4, code: "phone", label: "Telefono", minWidth: 100 },
      { id: 5, code: "date", label: "Fecha de alta", minWidth: 100 },
    ],
    isLoading: false,
    objFunnels: [],
    contactos: [],
    idFunel: null,
    error: null,
    modalIsOpen: false,
  });

  useEffect(async () => {
    if (obj != null) {
      await GetFunnenls();
    }
  }, [obj]);

  const GetFunnenls = async () => {
    let metod = "get";
    let resource = "funnel/all";
    const result = await ApiService(metod, resource);
    setStateAdd({ ...stateAdd, objFunnels: result.data.rows });
  };

  const llenaContactos = async (e) => {
    if (e.target.value != 0) {
      let id = e.target.value;
      let metod = "get";
      let resource = `user/contact?f=${id}`;
      const result = await ApiService(metod, resource);
      setStateAdd({ ...stateAdd, contactos: result.data.rows, idFunel: id });
    } else {
      setStateAdd({
        ...stateAdd,
        idFunel: null,
        error:
          "Debes escojer un proyecto para poder visualizar los contactos que pertenecen a el",
      });
    }
  };

  function openModal() {
    if (stateAdd.idFunel != null) {
      setStateAdd({ ...stateAdd, modalIsOpen: true, error: null });
    } else {
      setStateAdd({
        ...stateAdd,
        modalIsOpen: false,
        error: "Debe seleccionar un embudo para poder crear un contacto",
      });
      return;
    }
  }

  const closeModal = () => setStateAdd({ ...stateAdd, modalIsOpen: false });

  return (
    <div className="contenedor-dashboard">
      <div className="d-flex flex-column">
        <div>
          <div className="col">
            <h1 className="mx-2 text-center">Contactos</h1>
          </div>

          <div className="row shadow bg-white mx-1 py-2 mb-2">
            <div className="d-none d-md-flex">
              <div className="col mx-5">
                <select
                  name="selectfunnels"
                  id="selectfunnels"
                  className="form-input_text"
                  //onChange={(e) => llenaContactos(e)}
                >
                  <option value="7" defaultValue>
                    Últimos 7 días
                  </option>
                  <option value="30">Últimos 30 días</option>
                </select>
              </div>
              <div className="col d-flex py-2">
                <div>
                  <img
                    src="/assets/contacto1.svg"
                  />
                </div>
                <div className="text-orange">CONTACTOS NUEVOS</div>
              </div>

              <div className="col d-flex py-2 ">
                <div className="icon">
                  <RiFileExcel2Line />
                </div>
                <div className="text-orange">TODOS LOS CONTACTOS</div>
              </div>

              <div className="col d-flex py-2 ">
                <div className="icon">
                  <FiSearch />
                </div>
                <div>
                  <div className="text-orange">DADOS DE BAJA</div>
                </div>
              </div>
            </div>
            {stateAdd.error != null ? (
              <p className="text-center text-orange">{stateAdd.error}</p>
            ) : (
              <></>
            )}
            <div className="d-md-none">
              <div className="row gy-2">
                <div className="col">
                  <select
                    name="selectfunnels"
                    id="selectfunnels"
                    className="form-select"
                    onChange={(e) => llenaContactos(e)}
                  >
                    <option value="0" defaultValue>
                      Busca tu proyecto
                    </option>
                    {stateAdd.objFunnels.map((i) => (
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
                      <RiFileExcel2Line />
                    </div>
                  </div>
                  <div className="cta_text cta_text--white">
                    DESCARGAR EXCEL
                  </div>
                </button>
                <button className="col cta cta--icon cta--orange">
                  <div className="cta_icon">
                    <div className="icon">
                      <FiSearch />
                    </div>
                  </div>
                  <div className="cta_text cta_text--white">NUEVO CONTACTO</div>
                </button>
              </div>
            </div>
          </div>

          <div className="row shadow bg-white mx-1 py-2">
            <div className="d-none d-md-flex">
              <div className="col mx-5">
                <select
                  name="selectfunnels"
                  id="selectfunnels"
                  className="form-input_text"
                  onChange={(e) => llenaContactos(e)}
                >
                  <option value="0" defaultValue>
                    Busca tu proyecto
                  </option>
                  {stateAdd.objFunnels.map((i) => (
                    <option key={i.Fun_ID} value={i.Fun_ID}>
                      {i.Fun_Name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="cta cta--icon cta--blue">
                <div className="cta_icon">
                  <RiFileExcel2Line />
                </div>
                <div className="cta_text cta_text--white">DESCARGAR EXCEL</div>
              </button>
              <button className="cta cta--icon cta--orange" onClick={openModal}>
                <div className="cta_icon">
                  <FiSearch />
                </div>
                <div>
                  <div className="cta_text cta_text--white">NUEVO CONTACTO</div>
                </div>
              </button>
            </div>
            {stateAdd.error != null ? (
              <p className="text-center text-orange">{stateAdd.error}</p>
            ) : (
              <></>
            )}
            <div className="d-md-none">
              <div className="row gy-2">
                <div className="col">
                  <select
                    name="selectfunnels"
                    id="selectfunnels"
                    className="form-select"
                    onChange={(e) => llenaContactos(e)}
                  >
                    <option value="0" defaultValue>
                      Busca tu proyecto
                    </option>
                    {stateAdd.objFunnels.map((i) => (
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
                      <RiFileExcel2Line />
                    </div>
                  </div>
                  <div className="cta_text cta_text--white">
                    DESCARGAR EXCEL
                  </div>
                </button>
                <button className="col cta cta--icon cta--orange">
                  <div className="cta_icon">
                    <div className="icon">
                      <FiSearch />
                    </div>
                  </div>
                  <div className="cta_text cta_text--white">NUEVO CONTACTO</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col shadow my-2">
          {stateAdd.idFunel != null ? (
            <>
              {stateAdd.contactos.length === 0 ? (
                <div className="alert alert-primary" role="alert">
                  No tienes contactos que mostrar en este embudo...
                </div>
              ) : (
                <TableContact_component
                  data={stateAdd}
                  stateData={setStateAdd}
                />
              )}
            </>
          ) : (
            <Paper sx={{ overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table aria-label="sticky table" tabIndex={-1}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>
                      {stateAdd.columns.map((column) => (
                        <TableCell
                          tabIndex={-1}
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                      <TableCell className="text-center">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </div>
      </div>

      <Modal show={stateAdd.modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Estas agregando al contacto...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddContactsView data={stateAdd} stateData={setStateAdd} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
