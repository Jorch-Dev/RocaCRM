import React, { Fragment, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,

} from "@material-ui/core";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IconUI } from "../utils/IconUI";

export const TableSales_component = () => {
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
    rowsPerPage: 10,
    modalIsOpen: false,
  });

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, rowsPerPage: +event.target.value, page: 0 });
  };


  return (
    <>
      <div className='card'>
      <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <thead>
                    <tr>
                      {pagination.columns.map((column) => (
                        <>
                          <td className="bottom-border" key={column.id}>
                            <div className="text-bold text-secondary text-0 pt-1 pb-3">
                              {column.label}
                            </div>
                          </td>
                        </>
                      ))}
                    </tr>
                  </thead>
                </Table>
              </TableContainer>

              {/* <TablePagination
                animation="false"
                rowsPerPageOptions={[5]}
                component="div"
                count={pagination.allcontactos.length}
                rowsPerPage={pagination.rowsPerPage}
                page={pagination.page}
                onPageChange={handleChangePage}
              /> */}
      </div>
    </>
  );
};
