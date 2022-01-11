import React, { useState, useEffect, useContext } from "react";
import { TableContact_component } from "../components/tablecontact_component";
import {
  FiSearch,
  RiFileExcel2Line,
  RiContactsFill,
  IoMdContacts,
  TiUserDelete,
} from "react-icons/all";
import { AddContactsView } from "./addcontacts_view";
import { ApiService, getContactExcel } from "../services/api_service";
import { UserContext } from "../context/user_context";
import { IconUI } from "../utils/IconUI";
import { lightBlue, green, lightOrange, white } from "../styles/colors";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
} from "@mui/material";
import Modal from "react-bootstrap/Modal";

export const Contacts_view = () => {
  const { userState } = useContext(UserContext);
  const [stateAdd, setStateAdd] = useState({
    columns: [
      { id: 1, code: "name", label: "Nombre", minWidth: 100 },
      { id: 2, code: "lasName", label: "Apellido", minWidth: 100 },
      { id: 3, code: "email", label: "Email", minWidth: 100 },
      { id: 4, code: "phone", label: "Telefono", minWidth: 100 },
      { id: 5, code: "Funnel", label: "Pertenece al funnel", minWidth: 100 },
    ],
    isLoading: false,
    objFunnels: [],
    contactos: [],
    allcontactos: [],
    idFunel: null,
    error: null,
    modalIsOpen: false,
    days: 7,
    contacts: {},
    page: 0,
    rowsPerPage: 10,
  });

  useEffect(async () => {
    if (stateAdd.objFunnels.length === 0) {
      setStateAdd({ ...stateAdd, isLoading: true });
      const funnels = await ApiService("get", "funnel/all");

      if (funnels.status != 200) {
        setStateAdd({
          ...stateAdd,
          idFunel: null,
          error:
            "Error del sistema, intente de nuevo más tarde o comuníquese con un asesor",
        });
      } else {
        if (stateAdd.days != null) {
          const result = await ApiService(
            "get",
            "user/contact/stats?d=" + stateAdd.days
          );
          if (result != null) {
            let metod = "get";
            let resource = `user/contact/all`;
            const contacts = await ApiService(metod, resource);

            if (result === 401) {
              setStateAdd({
                ...stateAdd,
                idFunel: null,
                error:
                  "Error del sistema, intente de nuevo más tarde o comuníquese con un asesor",
              });
              return;
            } else {
              setStateAdd({
                ...stateAdd,
                allcontactos: contacts.data.contacts,
                contacts: result,
                isLoading: false,
                objFunnels: funnels.data.rows,
                error: null,
              });
            }
          }
        } else {
          setStateAdd({
            ...stateAdd,
            idFunel: null,
            error:
              "Error del sistema, intente de nuevo más tarde o comuníquese con un asesor",
          });
        }
      }
    }
  }, [stateAdd.objFunnels]);

  const cambiaPagina = (event, newPage) => {
    setStateAdd({ ...stateAdd, page: newPage });
  };

  const getRange = async (e) => {
    if (e != null) {
      setStateAdd({ ...stateAdd, days: e.target.value });
    }
  };

  const llenaContactos = async (e) => {
    if (e != 0) {
      setStateAdd({
        ...stateAdd,
        isLoading: true,
      });
      let id = e;
      let metod = "get";
      let resource = `user/contact?f=${id}&o=0&l=100`;
      const result = await ApiService(metod, resource);

      if (result === 401) {
        setStateAdd({
          ...stateAdd,
          idFunel: null,
          error:
            "Error del sistema, intente de nuevo más tarde o comuníquese con un asesor",
          isLoading: false,
        });
        return;
      } else {
        setStateAdd({
          ...stateAdd,
          contactos: result.data.rows,
          idFunel: id,
          error: null,
          isLoading: false,
        });
      }
    } else {
      setStateAdd({
        ...stateAdd,
        idFunel: null,
        error: null,
      });
    }
  };

  const downloadExcel = async () => {
    if (stateAdd.idFunel != null) {
      if (stateAdd.contactos.length !== 0) {
        const result = await getContactExcel(stateAdd.idFunel);
        if (result === 401) {
          setStateAdd({
            ...stateAdd,
            idFunel: null,
            error:
              "Error del sistema, intente de nuevo más tarde o comuníquese con un asesor",
          });
        } else {
          setStateAdd({
            ...stateAdd,
            error: null,
          });
        }
      } else {
        setStateAdd({
          ...stateAdd,
          idFunel: null,
          error: "Este proyecto no cuenta con contactos activos",
        });
      }
    } else {
      setStateAdd({
        ...stateAdd,
        idFunel: null,
        error: "Debe escojer un proyecto para poder descargar su archivo",
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
      {/* {stateAdd.isLoading ? (
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-secondary text-center" role="status">
          <span className="sr-only"></span>
        </div>
        </div>
        
      ) : ( */}
      <div className="d-flex flex-column">
        <div>
          <div className="position-relative">
            <div className="text-big text-primary text-bold">Bienvenido</div>
            <div className="text-secondary text-0 ">
              {userState.usuario !== null ? (
                <span className="mx-2 text-0">
                  {userState.usuario.Usr_Name} {userState.usuario.Usr_Lastname}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
          <br />
          <div className="row shadow bg-white mx-1 pt-2 mb-2">
            <div className="d-none d-md-flex">
              <div className="col-6 d-flex justify-content-center align-items-center ms-2 mt-3">
                <select
                  name="selectfunnels"
                  id="selectfunnels"
                  className="form-input"
                  onChange={(e) => getRange(e)}
                >
                  <option value="7" className="text-small" defaultValue>
                    Últimos 7 días
                  </option>
                  <option value="30" className="text-small">
                    Últimos 30 días
                  </option>
                </select>
              </div>
              <div className="col-2 d-flex flex-column">
                <div className="col text-center text-primary">
                  Nuevos contactos
                </div>

                <div className="col">
                  <div className="d-flex justify-content-center align-items-center">
                    {stateAdd.contacts.data != null ? (
                      <>
                        {stateAdd.isLoading ? (
                          <div
                            className="spinner-border text-secondary"
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                        ) : (
                          <>
                            <div className="col-3 d-flex justify-content-center align-items-center">
                              <IconUI size={30} color={lightBlue}>
                                <RiContactsFill />
                              </IconUI>
                            </div>

                            <div className="col-3 d-flex justify-content-center align-items-center pt-3">
                              <p className="text-orange">
                                {stateAdd.contacts.data.nuevos}
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-2 d-flex flex-column">
                <div className="col text-center text-primary">
                  Todos los contactos
                </div>
                <div className="col">
                  <div className="d-flex justify-content-center align-items-center">
                    {stateAdd.contacts.data != null ? (
                      <>
                        {stateAdd.isLoading ? (
                          <div
                            className="spinner-border text-secondary"
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                        ) : (
                          <>
                            <div className="col-3 d-flex justify-content-center align-items-center">
                              <IconUI size={30} color={green}>
                                <IoMdContacts />
                              </IconUI>
                            </div>

                            <div className="col-3 d-flex justify-content-center align-items-center pt-3">
                              <p className="text-orange">
                                {stateAdd.contacts.data.total}
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-2 d-flex flex-column">
                <div className="col text-center text-primary">
                  Dados de baja
                </div>
                <div className="col">
                  <div className="d-flex justify-content-center align-items-center">
                    {stateAdd.contacts.data != null ? (
                      <>
                        {stateAdd.isLoading ? (
                          <div
                            className="spinner-border text-secondary"
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                        ) : (
                          <>
                            <div className="col-3 d-flex justify-content-center align-items-center">
                              <IconUI size={30} color={lightOrange}>
                                <TiUserDelete />
                              </IconUI>
                            </div>

                            <div className="col-3 d-flex justify-content-center align-items-center pt-3">
                              <p className="text-orange">
                                {stateAdd.contacts.data.baja}
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-md-none">
              <div className="col d-flex justify-content-center align-items-center ms-2">
                <select
                  name="selectfunnels"
                  id="selectfunnels"
                  className="form-input"
                  onChange={(e) => getRange(e)}
                >
                  <option value="7" defaultValue>
                    Últimos 7 días
                  </option>
                  <option value="30">Últimos 30 días</option>
                </select>
              </div>
              <div className="col d-flex">
                <div className="col d-flex flex-column">
                  <div className="col text-center text-primary">
                    Nuevos contactos
                  </div>
                  <div className="col">
                    <div className="d-flex justify-content-center align-items-center">
                      {stateAdd.contacts.data != null ? (
                        <>
                          {stateAdd.isLoading ? (
                            <div
                              className="spinner-border text-secondary"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                          ) : (
                            <>
                              <div className="col-6 d-flex justify-content-center align-items-center">
                                <IconUI size={30} color={lightBlue}>
                                  <RiContactsFill />
                                </IconUI>
                              </div>

                              <div className="col-6 d-flex justify-content-center align-items-center pt-3">
                                <p className="text-orange">
                                  {stateAdd.contacts.data.nuevos}
                                </p>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col d-flex flex-column">
                  <div className="col text-center text-primary">
                    Todos los contactos
                  </div>
                  <div className="col">
                    <div className="d-flex justify-content-center align-items-center">
                      {stateAdd.contacts.data != null ? (
                        <>
                          {stateAdd.isLoading ? (
                            <div
                              className="spinner-border text-secondary"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                          ) : (
                            <>
                              <div className="col-6 d-flex justify-content-center align-items-center">
                                <IconUI size={30} color={green}>
                                  <IoMdContacts />
                                </IconUI>
                              </div>

                              <div className="col-6 d-flex justify-content-center align-items-center pt-3">
                                <p className="text-orange">
                                  {stateAdd.contacts.data.total}
                                </p>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col d-flex flex-column">
                  <div className="col text-center text-primary">
                    Dados de baja
                  </div>
                  <div className="col">
                    <div className="d-flex justify-content-center align-items-center">
                      {stateAdd.contacts.data != null ? (
                        <>
                          {stateAdd.isLoading ? (
                            <div
                              className="spinner-border text-secondary"
                              role="status"
                            >
                              <span className="sr-only"></span>
                            </div>
                          ) : (
                            <>
                              <div className="col-6 d-flex justify-content-center align-items-center">
                                <IconUI size={30} color={lightOrange}>
                                  <TiUserDelete />
                                </IconUI>
                              </div>

                              <div className="col-6 d-flex justify-content-center align-items-center pt-3">
                                <p className="text-orange">
                                  {stateAdd.contacts.data.baja}
                                </p>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row shadow bg-white mx-1 py-2">
            <div className="d-none d-xl-flex">
              <div className="col-md-8 mx-1 d-flex justify-content-center align-items-center">
                <select
                  name="selectfunnels"
                  id="selectfunnels"
                  className="form-input"
                  onChange={(e) => llenaContactos(e.target.value)}
                >
                  <option value="0" defaultValue>
                    Filtralo por funnel aquí
                  </option>
                  {stateAdd.objFunnels.map((i) => (
                    <option key={i.Fun_ID} value={i.Fun_ID}>
                      {i.Fun_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col d-none d-xl-flex justify-content-center align-items-center">
                <div className="col d-none d-xl-block position-relative">
                  <button className="cta cta--blue" onClick={downloadExcel}>
                    <div className="d-flex align-items-center">
                      <IconUI color={white}>
                        <RiFileExcel2Line />
                      </IconUI>
                      <div className="cta_text ps-2">DESCARGAR EXCEL</div>
                    </div>
                  </button>
                </div>
                <div className="col d-none d-xl-block position-relative ms-1">
                  <button className="cta cta--orange" onClick={openModal}>
                    <div className="d-flex align-items-center">
                      <IconUI color={white}>
                        <FiSearch />
                      </IconUI>
                      <div className="cta_text ps-2">NUEVO CONTACTO</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            {stateAdd.error != null ? (
              <p className="text-center text-orange">{stateAdd.error}</p>
            ) : (
              <></>
            )}
            <div className="d-xl-none">
              <div className="row gy-2">
                <div className="col">
                  <select
                    name="selectfunnels"
                    id="selectfunnels"
                    className="form-input"
                    onChange={(e) => llenaContactos(e.target.value)}
                  >
                    <option value="0" defaultValue>
                      Filtralo por funnel aquí
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
                <button
                  className="col cta cta--icon cta--blue"
                  onClick={downloadExcel}
                >
                  <div className="d-flex align-items-center">
                    <IconUI color={white}>
                      <RiFileExcel2Line />
                    </IconUI>
                    <div className="cta_text ps-2">DESCARGAR EXCEL</div>
                  </div>
                </button>
                <button
                  className="col cta cta--icon cta--orange"
                  onClick={openModal}
                >
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

        <div className="col shadow mx-1 my-2">
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
                  onEditUser={(contacto) => {
                    const newArray = stateAdd.contactos.filter(
                      (x) => x.Con_ID != contacto.Con_ID
                    );
                    //Al finalizar la edicion, agrega el item al principio del arreglo
                    newArray.unshift(contacto);

                    setStateAdd({
                      ...stateAdd,
                      contactos: newArray,
                      idFunel: contacto.Fun_ID,
                    });
                  }}
                />
              )}
            </>
          ) : (
            <div className='card'>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table aria-label="sticky table" tabIndex={-1}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox"></TableCell>
                      {stateAdd.columns.map((column) => (
                        <TableCell
                          tabIndex={-1}
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          className="text-bold text-primary text-0"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stateAdd.allcontactos
                      .slice(
                        stateAdd.page * stateAdd.rowsPerPage,
                        stateAdd.page * stateAdd.rowsPerPage +
                          stateAdd.rowsPerPage
                      )
                      .map((i, x) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={i.Con_ID}
                          >
                            <TableCell className="text-center text-bold text-primary text-0">
                              {x + 1}
                            </TableCell>
                            <TableCell className="text-secondary">
                              {i.Con_Name}
                            </TableCell>
                            <TableCell className="text-secondary">
                              {i.Con_Lastname}
                            </TableCell>
                            <TableCell className="text-secondary">
                              {i.Con_Email}
                            </TableCell>
                            <TableCell className="text-secondary">
                              {i.Con_Phone}
                            </TableCell>
                            <TableCell className="text-secondary">
                              {i.Fun_Name}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                animation="false"
                rowsPerPageOptions={[-1]}
                component="div"
                count={stateAdd.allcontactos.length}
                rowsPerPage={stateAdd.rowsPerPage}
                page={stateAdd.page}
                onPageChange={cambiaPagina}
              />
            </div>
          )}
        </div>
      </div>

      <Modal show={stateAdd.modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Estas agregando al contacto...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddContactsView
            data={stateAdd}
            stateData={setStateAdd}
            onAddUser={(contacto) => {
              //Al finalizar el add del nuevo contacto, agrega el item al principio del arreglo
              stateAdd.contactos.unshift(contacto);
              setStateAdd({
                ...stateAdd,
                idFunel: contacto.Fun_ID,
              });
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};
