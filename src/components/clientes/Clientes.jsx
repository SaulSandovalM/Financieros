import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListIcon from "@material-ui/icons/List";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import AppsIcon from "@material-ui/icons/Apps";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Chip from "@material-ui/core/Chip";
import MuiAlert from "@material-ui/lab/Alert";
import firebase from "../../Firebase";
import { TextField } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  rootTable: {
    width: "100%",
  },
  container: {
    height: "auto",
  },
  button: {
    margin: theme.spacing(1),
    padding: 14.5,
    width: "100%",
  },
  dialog: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  formControlTwo: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "80%",
  },
}));

export default function Clientes() {
  const classes = useStyles();

  const [age, setAge] = React.useState("");
  const [viewType, setViewType] = React.useState("Tabla");
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState({
    nombre: "",
    sucursal: "Sucursal 1",
    telefono: "",
    correo: "",
    estatus: true,
  });

  useEffect(() => {
    setLoading(true);
    const itemsRefComprometidos = firebase
      .database()
      .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/clientes`);
    listenComprometidos(itemsRefComprometidos);
    setLoading(false);
  }, []);

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      var clientes = [];
      snap.forEach((child) => {
        clientes.push({
          id: child.key,
          nombre: child.val().nombre,
          sucursal: child.val().sucursal,
          telefono: child.val().telefono,
          correo: child.val().correo,
          estatus: child.val().estatus,
        });
      });
      setData(clientes);
    });
  };

  const crearCliente = (e) => {
    e.preventDefault();
    const params = {
      nombre: state.nombre,
      sucursal: state.sucursal,
      telefono: state.telefono,
      correo: state.correo,
      estatus: true,
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    if (
      params.nombre &&
      params.sucursal &&
      params.telefono &&
      params.correo &&
      params.estatus &&
      params.created_at &&
      params.updated_at
    ) {
      firebase
        .database()
        .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/clientes`)
        .push(params)
        .then(() => {
          setSeverity("success");
          handleClickAlert();
          handleClose();
          setState({
            nombre: "",
            sucursal: "",
            telefono: "",
            correo: "",
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

  function handleChangeText(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <div className={classes.root}>
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
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Clientes</Typography>
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
            Clientes
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
        <DialogTitle>Nuevo cliente</DialogTitle>
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
                  value={state.telefono}
                  onChange={handleChangeText}
                  name="telefono"
                  label="Telefono"
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
                  value={state.correo}
                  onChange={handleChangeText}
                  name="correo"
                  label="Correo"
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={crearCliente} color="primary">
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
                  <TableCell style={{ color: "white" }}>Nombre</TableCell>
                  <TableCell style={{ color: "white" }}>Sucursal</TableCell>
                  <TableCell style={{ color: "white" }}>Telefono</TableCell>
                  <TableCell style={{ color: "white" }}>Correo</TableCell>
                  <TableCell style={{ color: "white" }}>Estatus</TableCell>
                  <TableCell style={{ color: "white" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.sucursal}</TableCell>
                    <TableCell>{row.telefono}</TableCell>
                    <TableCell>{row.correo}</TableCell>
                    <TableCell>{row.estatus ? "Activo" : "Inactivo"}</TableCell>
                    <TableCell>
                      <IconButton aria-label="settings">
                        <Link to={`/detallecliente/${row.id}`}>
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
                <CardMedia
                  className={classes.media}
                  image={item.imagen}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography>{item.nombre}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.telefono}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography>{item.sucursal}</Typography>
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
                  <IconButton aria-label="settings">
                    <Link to={`/detallecolaborador/${item.id}`}>
                      <MoreVertIcon />
                    </Link>
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
