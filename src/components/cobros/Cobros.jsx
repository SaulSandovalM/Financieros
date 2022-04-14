import React from "react";
// import "./Common.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "fecha", label: "Fecha", width: "10%" },
  { id: "folio", label: "Folio", width: "10%" },
  { id: "servicios", label: "Servicios", width: "10%" },
  { id: "colaborador", label: "Colaborador", width: "10%" },
  { id: "sucursal", label: "Sucursal", width: "10%" },
  { id: "origen", label: "Origen", width: "10%" },
  { id: "monto", label: "Monto", width: "10%" },
  { id: "comision", label: "Comision", width: "10%" },
  { id: "estatus", label: "Estatus", width: "10%" },
  { id: "acciones", label: "Acciones", width: "10%" },
];

function createData(
  fecha,
  folio,
  servicios,
  colaborador,
  sucursal,
  origen,
  monto,
  comision,
  estatus,
  acciones
) {
  return {
    fecha,
    folio,
    servicios,
    colaborador,
    sucursal,
    origen,
    monto,
    comision,
    estatus,
    acciones,
  };
}

const rows = [
  createData(
    "21/03/2022",
    "s87df6s8d7f6s8d7f",
    "Lavado y corte",
    "Luis Jimenez",
    "Campestre",
    "App",
    "$ 350",
    "$ 17.50",
    "Confirmado",
    ""
  ),
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  paperone: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    backgroundSize: "cover",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Cobros() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography variant="h4">Cobros</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Vista</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="Vista"
              >
                <MenuItem value="mensual">Mensual</MenuItem>
                <MenuItem value="historico">Historico</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paperone}>
            <Typography style={{ color: "gray" }}>SERVICIOS</Typography>
            <Typography style={{ color: "gray" }}>218</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paperone}>
            <Typography style={{ color: "gray" }}>VENTAS</Typography>
            <Typography style={{ color: "gray" }}>$ 25,450 MXN</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paperone}>
            <Typography style={{ color: "gray" }}>TICKET PROMEDIO</Typography>
            <Typography style={{ color: "gray" }}>89</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </div>
  );
}
