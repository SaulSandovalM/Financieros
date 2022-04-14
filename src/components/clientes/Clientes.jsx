import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "imagen", label: "", width: "12%" },
  { id: "nombre", label: "Nombre", width: "12%" },
  { id: "empresa", label: "Empresa", width: "12%" },
  { id: "sucursal", label: "Sucursal", width: "12%" },
  { id: "telefono", label: "Telefono", width: "12%" },
  { id: "correo", label: "Correo", width: "12%" },
  { id: "estatus", label: "Estatus", width: "12%" },
  { id: "acciones", label: "Acciones", width: "12%" },
];

function createData(
  imagen,
  nombre,
  empresa,
  sucursal,
  telefono,
  correo,
  estatus,
  acciones
) {
  return {
    imagen,
    nombre,
    empresa,
    sucursal,
    telefono,
    correo,
    estatus,
    acciones,
  };
}

const rows = [
  createData(
    "",
    "Sandra Martinez",
    "Estetica wellbe",
    "Altabrisa",
    "9991989867",
    "mariana@gmailcom",
    "activo",
    ""
  ),
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  rootTable: {
    width: "100%",
  },
  container: {
    minHeight: "68vh",
  },
}));

export default function Clientes() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography variant="h4" style={{ marginRight: 30 }}>
              Clientes
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Paper className={classes.rootTable}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{
                      width: column.width,
                      background: "#3f51b5",
                      color: "white",
                      border: "0px solid #3f51b5",
                    }}
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
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align="center"
                            style={{
                              width: column.width,
                              border: "0px solid #fff",
                            }}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
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
        />
      </Paper>
    </div>
  );
}
