import React, { Fragment, useState } from "react";
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
import { EditContactsView } from "../views/editcontacts_view";
import Swal from "sweetalert2";

export const TableSales_component = () => {
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
        id: 1,
        name: "Jhonatan",
        lasName: "Bello",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 2,
        name: "Christian",
        lasName: "Juarez",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 3,
        name: "Adrian",
        lasName: "Juarez",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 4,
        name: "Jorge",
        lasName: "García",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 5,
        name: "Moises",
        lasName: "Roca",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 6,
        name: "Sebastian",
        lasName: "Arzega",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 7,
        name: "Karla",
        lasName: "Paola",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 8,
        name: "Kevin",
        lasName: "Bello",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 9,
        name: "Victor",
        lasName: "Ponce",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 10,
        name: "Manuel",
        lasName: "Castillo",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 11,
        name: "Josafat",
        lasName: "Calderon",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 12,
        name: "Viridiana",
        lasName: "Resendiz",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 13,
        name: "Naif",
        lasName: "Alejandre",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 14,
        name: "Petra",
        lasName: "Bello",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
      {
        id: 15,
        name: "Juan",
        lasName: "Carranza",
        email: "rocafunnels@gmail.com",
        phone: 3287263742,
        date: "03/08/2021",
      },
    ],
    page: 0,
    rowsPerPage: 10,
    modalIsOpen: false,
  });

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, rowsPerPage: +event.target.value, page: 0 });
  };

  //#region  ventana modal
  let subtitle;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function openModal() {
    setPagination({ ...pagination, modalIsOpen: true });
  }

  function afterOpenModal() {
    subtitle.style.color = "#1a47bc";
  }

  function closeModal() {
    setPagination({ ...pagination, modalIsOpen: false });
  }
  //#endregion

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

  return (
    <>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }} tabIndex={-1}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                {pagination.columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="col text-center">Acciones</div>
                  </TableCell>
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
                            data-bs-toggle="modal"
                            data-bs-target="#editModal"
                            className="me-auto"
                          >
                            <MdEdit className="icon-succes" size="30" />
                          </div>

                          <div onClick={deleteContac} >
                            <MdDeleteForever className="icon-delete" size="30" />
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Columnas por página"
        />
      </Paper>

      <div
        className="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Estas editando al contacto...
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <EditContactsView /> */}
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
    </>
  );
};
