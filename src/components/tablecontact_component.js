import React, { useState,} from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Checkbox,
} from "@mui/material";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { ApiService } from "../services/api_service";
import { EditContactsView } from "../views/editcontacts_view";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Moment from "moment";

export const TableContact_component = ({ data, stateData, onEditUser }) => {
  const [pagination, setPagination] = useState({
    columns: [
      { id: 1, code: "name", label: "Nombre", minWidth: 100 },
      { id: 2, code: "lasName", label: "Apellido", minWidth: 100 },
      { id: 3, code: "email", label: "Email", minWidth: 100 },
      { id: 4, code: "phone", label: "Telefono", minWidth: 100 },
      { id: 5, code: "date", label: "Fecha de alta", minWidth: 100 },
    ],
    page: 0,
    rowsPerPage: 10,
    modalIsOpen: false,
    objetoUsuario:null,
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
        console.log(result)
        if (result === 401) {
          stateData({
            ...data,
            idFunel: null,
            error:
              "Error del sistema, intente de nuevo más tarde o comuníquese con un asesor",
          });
          return;
        } else {
          const newArray = data.contactos.filter(
            (x) => x.Con_ID != e
          );

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
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table aria-label="sticky table" tabIndex={-1}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                {pagination.columns.map((column) => (
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
            <TableBody>
              {data.contactos.map((i) => {
                  
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={i.Con_ID}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>
                      <TableCell>{i.Con_Name}</TableCell>
                      <TableCell>{i.Con_Lastname}</TableCell>
                      <TableCell>{i.Con_Email}</TableCell>
                      <TableCell>{i.Con_Phone}</TableCell>
                      <TableCell>
                        {Moment(i.createdAt).format("MMMM DD, YYYY HH:mm")}
                      </TableCell>

                      <TableCell tabIndex={-1}>
                        <div className="d-flex justify-content-end">
                          <div
                            onClick={() => editContact(i)}
                            className="me-auto"
                          >
                            <MdEdit className="icon-succes" size="30" />
                          </div>

                          <div
                            onClick={() => deleteContac(i.Con_ID, i.Con_Name)}
                          >
                            <MdDeleteForever
                              className="icon-delete"
                              size="30"
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.contactos.length}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={cambiaPagina}
          onRowsPerPageChange={cambiaFilasxPagina}
          labelRowsPerPage="Columnas por página"
        />
      </Paper>

      <Modal show={pagination.modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Estas editando al contacto...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pagination.objetoUsuario != null ? (
            <EditContactsView
              data={pagination}
              onEditUser={(user)=>{
              
                onEditUser(user)
                setPagination({ ...pagination, isLoading: false, modalIsOpen: false });
                

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
