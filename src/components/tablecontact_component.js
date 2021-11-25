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

export const TableContact_component = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const columns = [
    { id: "name", label: "Nombre", minWidth: 170 },
    { id: "lasName", label: "Apellido", minWidth: 100 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "phone",
      label: "Telefono",
      minWidth: 170,
    },
    {
      id: "date",
      label: "Fecha de alta",
      minWidth: 170,
    },
  ];

  const rows = [
    {
      name: "Jhonatan",
      lasName: "Bello",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Christian",
      lasName: "Juarez",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Adrian",
      lasName: "Juarez",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Jorge",
      lasName: "García",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Moises",
      lasName: "Roca",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Sebastian",
      lasName: "Arzega",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Karla",
      lasName: "Paola",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Kevin",
      lasName: "Bello",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Victor",
      lasName: "Ponce",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Manuel",
      lasName: "Castillo",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Josafat",
      lasName: "Calderon",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Viridiana",
      lasName: "Resendiz",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Naif",
      lasName: "Alejandre",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Petra",
      lasName: "Bello",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
    {
      name: "Juan",
      lasName: "Carranza",
      email: "rocafunnels@gmail.com",
      phone: 3287263742,
      date: "03/08/2021",
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <MdEdit />
                      </TableCell>
                      <TableCell>
                      <MdDeleteForever />
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Columnas por página"
        />
      </Paper>
    </Fragment>
  );
};
