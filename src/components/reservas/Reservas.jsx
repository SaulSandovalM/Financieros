import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Edit from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListIcon from "@material-ui/icons/List";
import AppsIcon from "@material-ui/icons/Apps";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import firebase from "../../Firebase";

const columns = [
  { id: "hora", label: "Hora", width: "20%" },
  { id: "cliente", label: "Cliente", width: "20%" },
  { id: "servicio", label: "Servicio", width: "20%" },
  { id: "colaborador", label: "Colaborador", width: "20%" },
  { id: "estatus", label: "Estatus", width: "20%" },
];

function createData(hora, cliente, servicio, colaborador, estatus) {
  return {
    hora,
    cliente,
    servicio,
    colaborador,
    estatus,
  };
}

const rows = [
  createData(
    "9:00 am",
    "Sandra Martinez",
    "Tinte de pelo",
    "Marina Martinez",
    "$ 450 MXN"
  ),
];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControlTwo: {
    width: "100%",
  },
  rootTable: {
    width: "100%",
  },
  container: {
    minHeight: "68vh",
  },
  button: {
    margin: theme.spacing(1),
    padding: 14.5,
    width: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  dialog: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  rootAlert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Reservas() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [age, setAge] = React.useState("");
  const [viewType, setViewType] = React.useState("Tabla");
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [reservas, setReservas] = React.useState([]);
  const [state, setState] = React.useState({
    cliente: "",
    categoria: "",
    servicio: "",
    sucursal: "",
    colaborador: "",
    // cupon: "",
    fecha: "",
    hora: "",
    estatus: "",
    nota: "",
  });

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

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

  const handleChangeView = (type) => {
    setViewType(type);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const itemsRef = firebase.database().ref("reservas/");
    listenForItems(itemsRef);
  }, []);

  const listenForItems = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      var reservas = [];
      snap.forEach((child) => {
        reservas.push({
          cliente: child.val().cliente,
          categoria: child.val().categoria,
          servicio: child.val().servicio,
          sucursal: child.val().sucursal,
          colaborador: child.val().colaborador,
          cupon: child.val().cupon,
          fecha: child.val().fecha,
          hora: child.val().hora,
          estatus: child.val().estatus,
          id: child.key,
        });
      });
      setReservas(reservas);
    });
  };

  const crearReserva = (e) => {
    e.preventDefault();
    const params = {
      cliente: state.cliente,
      categoria: state.categoria,
      servicio: state.servicio,
      sucursal: state.sucursal,
      colaborador: state.colaborador,
      // cupon: state.cupon,
      fecha: state.fecha,
      hora: state.hora,
      estatus: state.hora,
    };
    if (
      params.cliente &&
      params.categoria &&
      params.servicio &&
      params.sucursal &&
      params.colaborador &&
      // params.cupon &&
      params.fecha &&
      params.hora &&
      params.estatus
    ) {
      firebase
        .database()
        .ref("reservas")
        .push(params)
        .then(() => {
          setSeverity("success");
          handleClickAlert();
          handleClose();
          setState({
            cliente: "",
            categoria: "",
            servicio: "",
            sucursal: "",
            colaborador: "",
            fecha: "",
            hora: "",
            estatus: "",
          });
        })
        .catch(() => {
          setSeverity("error");
          handleClickAlert();
        });
    } else {
      setSeverity("warning");
      handleClickAlert();
    }
  };

  function handleChangeText(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const hoy =
    new Date().getDate() +
    " " +
    monthNames[new Date().getMonth()] +
    " " +
    new Date().getFullYear();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Agenda {hoy}</Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Filtrar por
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="Filtrar por"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<ListIcon />}
            onClick={() => handleChangeView("Tabla")}
          >
            Tabla
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<AppsIcon />}
            onClick={() => handleChangeView("Tarjetas")}
          >
            Tarjetas
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            className={classes.button}
            endIcon={<AddCircleIcon color="primary" />}
            onClick={handleClickOpen}
          >
            Nueva reserva
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        classes={{
          paper: classes.dialog,
        }}
      >
        <DialogTitle>Nueva reserva</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <InputLabel>Cliente</InputLabel>
                <Select
                  name="cliente"
                  value={state.cliente}
                  onChange={handleChangeText}
                  label="Cliente"
                >
                  <MenuItem value="Juan">
                    <em>Juan</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <InputLabel>Categoria</InputLabel>
                <Select
                  name="categoria"
                  value={state.categoria}
                  onChange={handleChangeText}
                  label="Categoria"
                >
                  <MenuItem value="Cabello">
                    <em>Cabello</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <InputLabel>Servicio</InputLabel>
                <Select
                  name="servicio"
                  value={state.servicio}
                  onChange={handleChangeText}
                  label="Servicio"
                >
                  <MenuItem value="Corte">
                    <em>Corte</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <InputLabel>Sucursal</InputLabel>
                <Select
                  name="sucursal"
                  value={state.sucursal}
                  onChange={handleChangeText}
                  label="Sucursal"
                >
                  <MenuItem value="Altabrisa">
                    <em>Altabrisa</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <InputLabel>Colaborador</InputLabel>
                <Select
                  name="colaborador"
                  value={state.colaborador}
                  onChange={handleChangeText}
                  label="Colaborador"
                >
                  <MenuItem value="Sofia">
                    <em>Sofia</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Aplicar cupón
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={age}
                  onChange={handleChange}
                  label="Aplicar cupón"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={6}>
              <FormControl variant="outlined" style={{ width: "95%" }}>
                <TextField
                  variant="outlined"
                  label="Fecha"
                  type="date"
                  name="fecha"
                  value={state.fecha}
                  onChange={handleChangeText}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <InputLabel>Hora</InputLabel>
                <Select
                  name="hora"
                  value={state.hora}
                  onChange={handleChangeText}
                  label="Hora"
                >
                  <MenuItem value="9:00">
                    <em>9:00</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <TextField
                  variant="outlined"
                  label="Nota"
                  multiline
                  name="nota"
                  value={state.nota}
                  onChange={handleChangeText}
                  style={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={crearReserva} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={severity}>
          {severity === "success" && "Se ha generado al reserva"}
          {severity === "error" && "Al parecer algo salio mal"}
          {severity === "warning" && "Por favor llena el formulario"}
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        {viewType === "Tabla" ? (
          <Grid item xs={8}>
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
                    {reservas
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                count={reservas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        ) : (
          <Grid item xs={8}>
            <Grid container spacing={2}>
              {reservas.map((item) => (
                <Grid item xs={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" component="h2">
                        {item.cliente}
                      </Typography>
                      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                      <Typography
                        variant="caption"
                        display="block"
                        color="textSecondary"
                      >
                        Servicio
                      </Typography>
                      <Typography variant="body2" component="p">
                        {item.servicio}
                      </Typography>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography
                            variant="caption"
                            display="block"
                            color="textSecondary"
                          >
                            Colaborador
                          </Typography>
                          <Typography variant="body2" component="p">
                            {item.colaborador}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="caption"
                            display="block"
                            color="textSecondary"
                          >
                            Sucursal
                          </Typography>
                          <Typography variant="body2" component="p">
                            Campestre
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="caption"
                            display="block"
                            color="textSecondary"
                          >
                            Fecha
                          </Typography>
                          <Typography variant="body2" component="p">
                            21 Mar 2022
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="caption"
                            display="block"
                            color="textSecondary"
                          >
                            Hora
                          </Typography>
                          <Typography variant="body2" component="p">
                            {item.hora}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} style={{ marginTop: 15 }}>
                          <Typography variant="body1" gutterBottom>
                            {item.estatus}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} style={{ marginTop: 15 }}>
                          <Chip
                            label="Confirmado"
                            color="primary"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
        <Grid item xs={4}>
          <Paper style={{ height: "auto", padding: 20 }}>
            <div style={{ display: "flex" }}>
              <Typography style={{ marginRight: 20 }}>#20345</Typography>
              <Link to="/editarreserva">
                <Edit />
              </Link>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <div style={{ width: "20%" }}>Imagen</div>
              <div styke={{ width: "80%" }}>
                <Typography>Sandra Martinez Ocampo</Typography>
                <Typography>
                  Cliente recurrente: 18 reservas anteriores
                </Typography>
                <Typography>Confiabilidad: 65%</Typography>
                <Typography>sandra.martinez@gmail.com</Typography>
                <Typography>Cel: 99913456789</Typography>
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <div style={{ width: "20%" }}>Imagen</div>
              <div style={{ width: "80%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>Tinte de pelo</Typography>
                  <Typography>x1</Typography>
                </div>
                <Typography>Mariana Martinez Campestre</Typography>
                <Typography>21 Mar 2022</Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>9:30 - 10:00</Typography>
                  <Typography>$ 650 MXN</Typography>
                </div>
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <div style={{ width: "20%" }}>Imagen</div>
              <div style={{ width: "80%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>Metodo de pago</Typography>
                  <Typography>Estatus</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>Por definir</Typography>
                  <Typography>No pagado</Typography>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Total</Typography>
                <Typography>$ 650.00 mxn</Typography>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="primary">
                  Completar servicio
                </Button>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
