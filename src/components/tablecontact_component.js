import React, { Fragment, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination
} from "@material-ui/core";
import { MdDeleteForever, BiEdit } from "react-icons/all";
import { ApiService } from "../services/api_service";
import { EditContactsView } from "../views/editcontacts_view";
import { IconUI } from "../utils/IconUI";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Moment from "moment";

export const TableContact_component = ({ data, stateData, onEditUser }) => {
  const [pagination, setPagination] = useState({
    columns: [
      { id: 1, code: "id", label: " ", minWidth: 100 },
      { id: 2, code: "name", label: "Nombre", minWidth: 100 },
      { id: 3, code: "lasName", label: "Apellido", minWidth: 100 },
      { id: 4, code: "email", label: "Email", minWidth: 100 },
      { id: 5, code: "phone", label: "Telefono", minWidth: 100 },
      { id: 6, code: "date", label: "Fecha de alta", minWidth: 100 },
    ],
    page: 0,
    rowsPerPage: 5,
    modalIsOpen: false,
    objetoUsuario: null,
    isLoading: false,
  });
  

  const cambiaPagina = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const cambiaFilasxPagina = (event) => {
    setPagination({ ...pagination, rowsPerPage: +event.target.value, page: 0 });
  };

  const editContact = async (user) => {
    setPagination({
      ...pagination,
      objetoUsuario: user,
      modalIsOpen: true,
    });
  };

  const deleteContac = (e, n) => {
    Swal.fire({
      title: `Esta seguro de eliminar el contacto ${n}?`,
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#1a47bc",
      confirmButtonText: "Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let metod = "delete";
        let resource = `user/contact/${e}?f=${data.idFunel}`;
        const result = await ApiService(metod, resource);

        if (result === 401) {
          stateData({
            ...data,
            idFunel: null,
            error:
              "Error del sistema, intente de nuevo más tarde o comuníquese con un asesor",
          });
          return;
        } else {
          const newArray = data.contactos.filter((x) => x.Con_ID != e);

          stateData({
            ...data,
            contactos: newArray,
            idFunel: data.idFunel,
          });
        }
        Swal.fire("Borrado!", `El contacto ${n} se ha eliminado`, "success");
      }
    });
  };

  const closeModal = () => setPagination({ ...pagination, modalIsOpen: false });

  return (
    <>
      <div className="card">
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <thead>
              <tr>
                {pagination.columns.map((column) => (
                  <>
                    <td className="bottom-border" key={column.id}>
                      <div className="text-bold text-secondary text-0 pt-1 pb-3 ps-3">
                        {column.label}
                      </div>
                    </td>
                  </>
                ))}
                <td className="bottom-border">
                  <div></div>
                </td>
              </tr>
            </thead>
            <TableBody>
              {data.contactos

                .slice(
                  pagination.page * pagination.rowsPerPage,
                  pagination.page * pagination.rowsPerPage +
                    pagination.rowsPerPage
                )

                .map((c, j) => {
                  
                  return (
                    <tr key={j} className="table_row">
                      {pagination.columns.map((column, i) => {
                        var value = c[column.code];
                        return (
                          <Fragment key={i}>
                            {column.code === "name" ? (
                              <>
                                {/* <td className="bottom-border ps-3">
                                  <div className="text-secondary">{j + 1}</div>
                                </td> */}
                                <td className="bottom-border ps-3">
                                  <div className="text-secondary">
                                    {c.Con_Name}
                                  </div>
                                </td>
                                <td className="bottom-border ps-3">
                                  <div className="text-secondary">
                                    {c.Con_Lastname}
                                  </div>
                                </td>
                                <td className="bottom-border ps-3">
                                  <div className="text-secondary">
                                    {c.Con_Email}
                                  </div>
                                </td>
                                <td className="bottom-border ps-3">
                                  <div className="text-secondary">
                                    {c.Con_Phone}
                                  </div>
                                </td>
                                <td className="bottom-border ps-3">
                                  <div className="text-secondary">
                                    {Moment(c.createdAt).format(
                                      "MMMM DD, YYYY HH:mm"
                                    )}
                                  </div>
                                </td>
                                <td className="bottom-border ps-3">
                                  <div
                                    className="icon_btn"
                                    onClick={() => editContact(i)}
                                  >
                                    <IconUI size={20}>
                                      <BiEdit />
                                    </IconUI>
                                  </div>
                                </td>

                                <td className="bottom-border ps-3">
                                  <div
                                    className="icon_btn"
                                    onClick={() =>
                                      deleteContac(i.Con_ID, i.Con_Name)
                                    }
                                  >
                                    <IconUI size={20}>
                                      <MdDeleteForever />
                                    </IconUI>
                                  </div>
                                </td>
                              </>
                            ) : column.code === "id" ? (
                              <td className="bottom-border ps-3">
                                <div className="text-secondary">{j + 1}</div>
                              </td>
                            ) : (<></>)}
                          </Fragment>
                        );
                      })}
                    </tr>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          animation="false"
          rowsPerPageOptions={[-1]}
          component="div"
          count={data.contactos.length}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={cambiaPagina}
        />
      </div>

      <Modal show={pagination.modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Estas editando al contacto...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pagination.objetoUsuario != null ? (
            <EditContactsView
              data={pagination}
              onEditUser={(user) => {
                onEditUser(user);
                setPagination({
                  ...pagination,
                  isLoading: false,
                  modalIsOpen: false,
                });
              }}
              setData={setPagination}
              body={data}
              setBody={stateData}
            />
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
