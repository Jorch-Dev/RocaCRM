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

export const TableSales_component = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const columns = [
    { id: 1, code: "name", label: "Nombre", minWidth: 100 },
    { id: 2, code: "lasName", label: "Apellido", minWidth: 100 },
    { id: 3, code: "email", label: "Email", minWidth: 100 },
    { id: 4, code: "phone", label: "Telefono", minWidth: 100 },
    { id: 5, code: "date", label: "Fecha de alta", minWidth: 100 },
  ];

  const rows = [
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
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
      <>
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
                  <TableCell>
                    <MdEdit size="30" />
                  </TableCell>
                  <TableCell>
                    <MdDeleteForever size="30" />
                  </TableCell>
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
                        key={row.id}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" />
                        </TableCell>
                        {columns.map((column) => {
                          const value = row[column.code];
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
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Columnas por página"
          />
        </Paper>
      </>
  );
};
