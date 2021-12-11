import React, { useState, useEffect } from "react";
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
import { EditContactsView } from "../views/editcontacts_view"
import Modal from 'react-bootstrap/Modal'
import Swal from "sweetalert2";
import Moment from "moment";

export const TableContact_component = ({ data, stateData }) => {
  const [pagination, setPagination] = useState({
    columns: [
      { id: 1, code: "name", label: "Nombre", minWidth: 100 },
      { id: 2, code: "lasName", label: "Apellido", minWidth: 100 },
      { id: 3, code: "email", label: "Email", minWidth: 100 },
      { id: 4, code: "phone", label: "Telefono", minWidth: 100 },
      { id: 5, code: "date", label: "Fecha de alta", minWidth: 100 },
    ],
    rows: [
      {
        id: "",
        name: "",
        lasName: "",
        email: "",
        phone: "",
        date: "",
      },
    ],
    page: 0,
    rowsPerPage: 10,
    modalIsOpen: false,
    objetoUsuario: {},
    isLoading: false,
  });

  useEffect(() => {
    if (data != null) {
      data.contactos.map((i) =>
        setPagination({
          ...pagination,

          rows: [
            {
              id: i.Con_ID,
              name: i.Con_Name,
              lasName: i.Con_Lastname,
              email: i.Con_Email,
              phone: i.Con_Phone,
              date: Moment(i.createdAt).format("MMMM DD, YYYY HH:mm"),
            },
          ],
        })
      );
    }
  }, [data]);

  const cambiaPagina = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const cambiaFilasxPagina = (event) => {
    setPagination({ ...pagination, rowsPerPage: +event.target.value, page: 0 });
  };

  const editContact = async (e) => {
    let id = e;
    let metod = "get";
    let resource = `user/contact/${id}?f=${data.idFunel}`;
    const result = await ApiService(metod, resource);

    if (result === 401) {
      stateData({
        ...data,
        error:
          "Ocurrio un error, si el error persiste contacte a un administrador.",
      });
    } else {
      if (result != null) {
        setPagination({
          ...pagination,
          objetoUsuario: result.data,
          modalIsOpen: true,
        });
      }
    }
  };

  const deleteContac = () => {
    Swal.fire({
      title: `Esta seguro de eliminar el contacto nombre?`,
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#1a47bc",
      confirmButtonText: "Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Borrado!", `El contacto nombre se ha eliminado`, "success");
      }
    });
  };
  
  const closeModal = () => setPagination({ ...pagination, modalIsOpen: false });
  
  return (
    <>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
              {pagination.rows
                .slice(
                  pagination.page * pagination.rowsPerPage,
                  pagination.page * pagination.rowsPerPage +
                    pagination.rowsPerPage
                )
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>
                      {pagination.columns.map((column) => {
                        const value = row[column.code];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell tabIndex={-1}>
                        <div className="d-flex justify-content-end">
                          <div
                            onClick={() => editContact(row.id)}
                            className="me-auto"
                          >
                            <MdEdit className="icon-succes" size="30" />
                          </div>

                          <div onClick={deleteContac}>
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
          count={pagination.rows.length}
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
             <EditContactsView data={pagination} setData={setPagination} body={data} setBody={stateData} />
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
