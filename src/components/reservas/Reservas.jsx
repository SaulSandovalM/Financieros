import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
  { id: "fecha", label: "Hora", width: "20%" },
  { id: "cliente", label: "Cliente", width: "20%" },
  { id: "servicio", label: "Servicio", width: "20%" },
  { id: "colaborador", label: "Colaborador", width: "20%" },
  { id: "estatus", label: "Estatus", width: "20%" },
];

function createData(fecha, cliente, servicio, colaborador, estatus) {
  return {
    fecha,
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

function loadServerRows(page, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.slice(page * 20, (page + 1) * 20));
    }, Math.random() * 500 + 100); // simulate network latency
  });
}

export default function Reservas() {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [age, setAge] = React.useState("");
  const [viewType, setViewType] = React.useState("Tabla");
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [reservas, setReservas] = React.useState([]);
  const [clientes, setClientes] = React.useState([]);
  const [servicios, setServicios] = React.useState([]);
  const [sucursales, setSucursales] = React.useState([]);
  const [colaboradores, setColaboradores] = React.useState([]);
  const [change, setChange] = React.useState(false);
  const [selected, setSelected] = React.useState("");
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

  // const history = useHistory();

  const handleId = (id) => {
    // history.push("/");
    setSelected(id);
  };

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
    const itemsRefClientes = firebase
      .database()
      .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/clientes/`);
    listenForClientes(itemsRefClientes);
  }, [change]);

  // useEffect(() => {
  //   let active = true;

  //   (async () => {
  //     setLoading(true)
  //     const newRows = await loadServerRows(page, presupuesto)
  //     if (!active) {
  //       return
  //     }
  //     setRows(newRows)
  //     setLoading(false)
  //   })()

  //   return () => {
  //     active = false
  //   }
  // }, [page, presupuesto])

  const listenForClientes = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      if (snap.exists()) {
        console.log(snap.val());
        var cliente = [];
        snap.forEach((child) => {
          cliente.push({
            nombre: child.val().nombre,
            correo: child.val().correo,
            telefono: child.val().telefono,
            id: child.key,
          });
        });
        setClientes(cliente);

        const itemsRefSucursales = firebase
          .database()
          .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/sucursales/`);
        listenForSucursales(itemsRefSucursales);
      } else {
        console.log("No data available");
      }
    });
  };

  const listenForServicios = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      var servicios = [];
      snap.forEach((child) => {
        servicios.push({
          nombre: child.val().nombre,
          duracion: child.val().duracion,
          precio_sin: child.val().precio_sin,
          id: child.key,
        });
      });
      setServicios(servicios);
      const itemsRefColaboradores = firebase
        .database()
        .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/colaboradores/`);
      listenForColaboradores(itemsRefColaboradores);
    });
  };

  const listenForSucursales = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      var sucursales = [];
      snap.forEach((child) => {
        sucursales.push({
          nombre: child.val().nombre,
          id: child.key,
        });
      });
      setSucursales(sucursales);
      const itemsRefServicios = firebase
        .database()
        .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/servicios/`);
      listenForServicios(itemsRefServicios);
    });
  };

  const listenForColaboradores = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      var colaboradores = [];
      snap.forEach((child) => {
        colaboradores.push({
          nombre: child.val().nombre,
          id: child.key,
        });
      });
      setColaboradores(colaboradores);
      const itemsRef = firebase
        .database()
        .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/reservas/`);
      listenForItems(itemsRef);
    });
  };

  const listenForItems = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      var reservas = [];
      snap.forEach((child) => {
        reservas.push({
          cliente: clientes.map(
            (item) => item.id === child.val().cliente && item.nombre
          ),
          correo: clientes.map(
            (item) => item.id === child.val().cliente && item.correo
          ),
          telefono: clientes.map(
            (item) => item.id === child.val().cliente && item.telefono
          ),
          servicio: servicios.map(
            (item) => item.id === child.val().servicio && item.nombre
          ),
          duracion: servicios.map(
            (item) => item.id === child.val().servicio && item.duracion
          ),
          precio: servicios.map(
            (item) => item.id === child.val().servicio && item.precio_sin
          ),
          sucursal: sucursales.map(
            (item) => item.id === child.val().sucursal && item.nombre
          ),
          colaborador: colaboradores.map(
            (item) => item.id === child.val().colaborador && item.nombre
          ),
          fecha: child.val().fecha,
          estatus: child.val().estatus,
          numero_reserva: child.val().numero_reserva,
          id: child.key,
        });
      });
      setReservas(reservas);
      setChange(true);
    });
  };

  const convertMinsToHrsMins = (mins) => {
    parseInt(mins);
    let h = Math.floor(mins[0] / 60);
    let m = mins[0] % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return `${h}`;
  };

  const convertMins = (mins) => {
    parseInt(mins);
    let h = Math.floor(mins[0] / 60);
    let m = mins[0] % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return `${m}`;
  };

  const crearReserva = (e) => {
    e.preventDefault();
    const date = state.fecha + " " + state.hora;
    const params = {
      cliente: state.cliente,
      // categoria: state.categoria,
      servicio: state.servicio,
      sucursal: state.sucursal,
      colaborador: state.colaborador,
      // cupon: state.cupon,
      fecha: date,
      estatus: true,
      numero_reserva: reservas.length + 1,
    };
    if (
      params.cliente &&
      params.servicio &&
      params.sucursal &&
      params.colaborador &&
      // params.cupon &&
      params.fecha &&
      params.estatus
    ) {
      firebase
        .database()
        .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/reservas/`)
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
                  {clientes.map((item) => (
                    <MenuItem value={item.id}>
                      <em>{item.nombre}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
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
            </Grid> */}
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
                  {servicios.map((item) => (
                    <MenuItem value={item.id}>
                      <em>{item.nombre}</em>
                    </MenuItem>
                  ))}
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
                  {sucursales.map((item) => (
                    <MenuItem value={item.id}>
                      <em>{item.nombre}</em>
                    </MenuItem>
                  ))}
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
                  {colaboradores.map((item) => (
                    <MenuItem value={item.id}>
                      <em>{item.nombre}</em>
                    </MenuItem>
                  ))}
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
                                  onClick={() => handleId(row.id)}
                                >
                                  {typeof value === "string"
                                    ? value.slice(10)
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
                <Grid item xs={6} onClick={() => handleId(item.id)}>
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
                            {new Date(item.fecha).getHours() +
                              ":" +
                              (new Date(item.fecha).getMinutes() === 0
                                ? "00"
                                : new Date(item.fecha).getHours())}
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
          {reservas.map((item) =>
            item.id === selected ? (
              <Paper style={{ height: "auto", padding: 20 }}>
                <div style={{ display: "flex" }}>
                  <Typography style={{ marginRight: 20 }}>
                    # {item.numero_reserva}
                  </Typography>
                  <Link to={`/editarreserva/${item.id}`}>
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
                    <Typography>{item.cliente}</Typography>
                    <Typography>
                      Cliente recurrente: 18 reservas anteriores
                    </Typography>
                    <Typography>Confiabilidad: 65%</Typography>
                    <Typography>{item.correo}</Typography>
                    <Typography>Cel: {item.telefono}</Typography>
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
                      <Typography>{item.servicio}</Typography>
                    </div>
                    <Typography>{item.colaborador}</Typography>
                    <Typography>
                      {new Date(item.fecha).getDate() +
                        " " +
                        monthNames[new Date(item.fecha).getMonth()] +
                        " " +
                        new Date(item.fecha).getFullYear()}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography>
                        {new Date(item.fecha).getHours()}:
                        {new Date(item.fecha).getMinutes() === 0
                          ? "00"
                          : new Date(item.fecha).getMinutes()}
                        -{" "}
                        {new Date(item.fecha).getHours() +
                          parseInt(convertMinsToHrsMins(item.duracion))}
                        :
                        {new Date(item.fecha).getMinutes() === 0
                          ? "00"
                          : new Date(item.fecha).getMinutes() +
                            parseInt(convertMins(item.duracion))}
                      </Typography>
                      <Typography>$ {item.precio} MXN</Typography>
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Total</Typography>
                    <Typography>$ {item.precio} mxn</Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" color="primary">
                      Completar servicio
                    </Button>
                  </div>
                </div>
              </Paper>
            ) : null
          )}
        </Grid>
      </Grid>
    </div>
  );
}
