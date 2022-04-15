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
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ListIcon from "@material-ui/icons/List";
import AppsIcon from "@material-ui/icons/Apps";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiAlert from "@material-ui/lab/Alert";
import firebase from "../../Firebase";

import clsx from "clsx";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
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
  formControlTwo: {
    width: "100%",
  },
  dialog: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Servicios() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();

  const [viewType, setViewType] = React.useState("Tabla");
  const [data, setData] = React.useState([]);
  const [sucursales, setSucursales] = React.useState([]);
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState({
    nombre: "",
    precio: "",
    precio_sin: "",
    duracion: "",
    garantia: "",
    sucursal: "",
    estatus: true,
  });

  useEffect(() => {
    setLoading(true);
    const itemsRefComprometidos = firebase
      .database()
      .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/servicios`);
    listenComprometidos(itemsRefComprometidos);
    setLoading(false);
  }, []);

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      var sucursales = [];
      snap.forEach((child) => {
        sucursales.push({
          id: child.key,
          nombre: child.val().nombre,
          precio: child.val().precio,
          precio_sin: child.val().precio_sin,
          duracion: child.val().duracion,
          garantia: child.val().garantia,
          sucursal: child.val().sucursal,
          estatus: child.val().estatus,
        });
      });
      setData(sucursales);
    });
  };

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChangeText(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
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

  const crearServicio = (e) => {
    e.preventDefault();
    const params = {
      nombre: state.nombre,
      precio: state.precio,
      precio_sin: state.precio_sin,
      duracion: state.duracion,
      garantia: state.garantia,
      sucursal: state.sucursal,
      estatus: true,
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    if (
      params.nombre &&
      params.precio &&
      params.precio_sin &&
      params.duracion &&
      params.garantia &&
      params.sucursal &&
      params.estatus &&
      params.created_at &&
      params.updated_at
    ) {
      firebase
        .database()
        .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/servicios`)
        .push(params)
        .then(() => {
          setSeverity("success");
          handleClickAlert();
          handleClose();
          setState({
            nombre: "",
            precio: "",
            precio_sin: "",
            duracion: "",
            garantia: "",
            sucursal: "",
            estatus: true,
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
              Servicios
            </Typography>
          </div>
        </Grid>
        <Grid item xs={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Sucursal
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="Sucursal"
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
          <TextField
            variant="outlined"
            label="Buscar"
            className={classes.formControl}
          />
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
            Servicio
          </Button>
        </Grid>
      </Grid>
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        classes={{
          paper: classes.dialog,
        }}
      >
        <DialogTitle>Nuevo servicio</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <TextField
                  variant="outlined"
                  label="Nombre del servicio"
                  multiline
                  name="nombre"
                  value={state.nombre}
                  onChange={handleChangeText}
                  style={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <TextField
                  variant="outlined"
                  label="Precio"
                  multiline
                  name="precio"
                  value={state.precio}
                  onChange={handleChangeText}
                  style={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <TextField
                  variant="outlined"
                  value={state.precio_sin}
                  onChange={handleChangeText}
                  name="precio_sin"
                  label="Precio sin descuento"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <TextField
                  variant="outlined"
                  value={state.duracion}
                  onChange={handleChangeText}
                  name="duracion"
                  label="Duración"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <TextField
                  variant="outlined"
                  label="Garantía"
                  name="garantia"
                  value={state.garantia}
                  onChange={handleChangeText}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Sucursal
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="sucursal"
                  value={state.sucursal}
                  onChange={handleChangeText}
                  label="Sucursal"
                >
                  {data.map((item) => (
                    <MenuItem value={item.id}>{item.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={crearServicio} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      {viewType === "Tabla" ? (
        <Paper className={classes.rootTable}>
          <TableContainer className={classes.container}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead style={{ background: "#3f51b5" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Servicio</TableCell>
                  <TableCell style={{ color: "white" }}>Precio</TableCell>
                  <TableCell style={{ color: "white" }}>
                    Precio sin descuento
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Duracion</TableCell>
                  <TableCell style={{ color: "white" }}>
                    Garantia para reservar
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Sucursales</TableCell>
                  <TableCell style={{ color: "white" }}>Estatus</TableCell>
                  <TableCell style={{ color: "white" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.precio}</TableCell>
                    <TableCell>{row.precio_sin}</TableCell>
                    <TableCell>{row.duracion}</TableCell>
                    <TableCell>{row.garantia}</TableCell>
                    <TableCell>{row.sucursal}</TableCell>
                    <TableCell>{row.estatus ? "Activo" : "Inactivo"}</TableCell>
                    <TableCell>
                      <IconButton aria-label="settings">
                        <Link to={`/detalleservicio/${row.id}`}>
                          <MoreVertIcon />
                        </Link>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={3}>
              <Card variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {item.nombre.slice(0, 1)}
                    </Avatar>
                  }
                  action={
                    <Link to={`/detallesucursal/${item.id}`}>
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    </Link>
                  }
                  title={item.nombre}
                />
                <CardMedia
                  className={classes.media}
                  image={item.imagen}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.precio}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.precio_sin}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    className={clsx(classes.expand)}
                    aria-label="show more"
                  >
                    <Chip
                      size="small"
                      label={item.estatus ? "Activo" : "Inactivo"}
                      color="primary"
                    />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
