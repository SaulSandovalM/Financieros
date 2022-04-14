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
  { id: "enviado", label: "Enviado", width: "11%" },
  { id: "tipo", label: "Tipo", width: "11%" },
  { id: "resumen", label: "Resumen", width: "11%" },
  { id: "empresa", label: "Empresa", width: "11%" },
  { id: "sucursal", label: "Sucursal", width: "11%" },
  { id: "colaborador", label: "Colaborador", width: "11%" },
  { id: "cliente", label: "Cliente", width: "11%" },
  { id: "status", label: "Status", width: "11%" },
];

function createData(
  enviado,
  tipo,
  resumen,
  empresa,
  sucursal,
  colaborador,
  cliente,
  status
) {
  return {
    enviado,
    tipo,
    resumen,
    empresa,
    sucursal,
    colaborador,
    cliente,
    status,
  };
}

const rows = [
  createData(
    "21/03/22",
    "Nueva reserva",
    "Maria Rovina",
    "Estetica Wellbe",
    "Altabrisa",
    "Mariana",
    "Maria Rovina",
    "Leido"
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

export default function Notification() {
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
              Notificaciones
            </Typography>
            <Typography variant="h4">21 mar 2022</Typography>
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
