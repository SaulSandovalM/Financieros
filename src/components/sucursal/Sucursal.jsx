import React, { useEffect } from "react";
import clsx from "clsx";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ListIcon from "@material-ui/icons/List";
import AppsIcon from "@material-ui/icons/Apps";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import firebase from "../../Firebase";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  table: {
    minWidth: 650,
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
  formControlTwo: {
    width: "100%",
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
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: "#3f51b5",
  },
  expand: {
    marginLeft: "auto",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Sucursal() {
  const classes = useStyles();

  const [age, setAge] = React.useState("");
  const [viewType, setViewType] = React.useState("Tabla");
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [sucursales, setSucursales] = React.useState([]);
  const [state, setState] = React.useState({
    imagen: "",
    nombre: "",
    estado: "",
    administrador: "",
    telefono: "",
    correo: "",
    direccion: "",
    descripcion: "",
    estatus: true,
  });

  useEffect(() => {
    const itemsRef = firebase.database().ref("sucursales/");
    listenForItems(itemsRef);
  }, []);

  const listenForItems = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      var sucursal = [];
      snap.forEach((child) => {
        sucursal.push({
          imagen: child.val().imagen,
          nombre: child.val().nombre,
          estado: child.val().estado,
          administrador: child.val().administrador,
          telefono: child.val().telefono,
          correo: child.val().correo,
          direccion: child.val().direccion,
          descripcion: child.val().descripcion,
          estatus: child.val().estatus,
          created_at: child.val().created_at,
          id: child.key,
        });
      });
      setSucursales(sucursal);
    });
  };

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const crearSucursal = (e) => {
    e.preventDefault();
    const file = state.imagen;
    const storageRef = firebase.storage().ref(`sucursales/${file.name}`);
    const task = storageRef.put(file);
    task.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.error(error.message);
      },
      () =>
        storageRef.getDownloadURL().then((url) => {
          const params = {
            imagen: url,
            nombre: state.nombre,
            estado: state.estado,
            administrador: state.administrador,
            telefono: state.telefono,
            correo: state.correo,
            direccion: state.direccion,
            descripcion: state.descripcion,
            estatus: true,
            created_at: Date.now(),
            updated_at: Date.now(),
            ubicacion: {
              estado: state.estado,
            },
            contacto: {
              telefono: state.telefono,
            },
          };
          if (
            params.imagen &&
            params.nombre &&
            params.estado &&
            params.administrador &&
            params.telefono &&
            params.correo &&
            params.direccion &&
            params.descripcion &&
            params.estatus &&
            params.created_at &&
            params.updated_at &&
            params.ubicacion
          ) {
            firebase
              .database()
              .ref("sucursales")
              .push(params)
              .then(() => {
                setSeverity("success");
                handleClickAlert();
                handleClose();
                setState({
                  imagen: "",
                  nombre: "",
                  estado: "",
                  administrador: "",
                  telefono: "",
                  correo: "",
                  direccion: "",
                  descripcion: "",
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
        })
    );
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

  const handleClose = () => {
    setOpen(false);
  };

  function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[
          "(",
          /[1-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        placeholderChar={"\u2000"}
        showMask
      />
    );
  }

  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setState({
      imagen: file,
    });
  };

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

  return (
    <div className={classes.root}>
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
          <Typography variant="h4">Sucursales</Typography>
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
        <Grid item xs={2}></Grid>
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
        <DialogTitle>Nueva sucursal</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <TextField
                  variant="outlined"
                  label="Carga una imagen"
                  type="file"
                  onChange={handleUpload}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  label="Nombre"
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
                <InputLabel>Estado</InputLabel>
                <Select
                  name="estado"
                  value={state.estado}
                  onChange={handleChangeText}
                  label="Estado"
                >
                  <MenuItem value="Aguascalientes">
                    <em>Aguascalientes</em>
                  </MenuItem>
                  <MenuItem value="Baja California">
                    <em>Baja California</em>
                  </MenuItem>
                  <MenuItem value="Baja California Sur">
                    <em>Baja California Sur</em>
                  </MenuItem>
                  <MenuItem value="Campeche">
                    <em>Campeche</em>
                  </MenuItem>
                  <MenuItem value="Chiapas">
                    <em>Chiapas</em>
                  </MenuItem>
                  <MenuItem value="Chihuahua">
                    <em>Chihuahua</em>
                  </MenuItem>
                  <MenuItem value="Ciudad de México">
                    <em>Ciudad de México</em>
                  </MenuItem>
                  <MenuItem value="Coahuila">
                    <em>Coahuila</em>
                  </MenuItem>
                  <MenuItem value="Colima">
                    <em>Colima</em>
                  </MenuItem>
                  <MenuItem value="Durango">
                    <em>Durango</em>
                  </MenuItem>
                  <MenuItem value="Estado de México">
                    <em>Estado de México</em>
                  </MenuItem>
                  <MenuItem value="Guanajuato">
                    <em>Guanajuato</em>
                  </MenuItem>
                  <MenuItem value="Guerrero">
                    <em>Guerrero</em>
                  </MenuItem>
                  <MenuItem value="Hidalgo">
                    <em>Hidalgo</em>
                  </MenuItem>
                  <MenuItem value="Jalisco">
                    <em>Jalisco</em>
                  </MenuItem>
                  <MenuItem value="Michoacán">
                    <em>Michoacán</em>
                  </MenuItem>
                  <MenuItem value="Morelos">
                    <em>Morelos</em>
                  </MenuItem>
                  <MenuItem value="Nayarit">
                    <em>Nayarit</em>
                  </MenuItem>
                  <MenuItem value="Nuevo León">
                    <em>Nuevo León</em>
                  </MenuItem>
                  <MenuItem value="Oaxaca">
                    <em>Oaxaca</em>
                  </MenuItem>
                  <MenuItem value="Puebla">
                    <em>Puebla</em>
                  </MenuItem>
                  <MenuItem value="Querétaro">
                    <em>Querétaro</em>
                  </MenuItem>
                  <MenuItem value="Quintana Roo">
                    <em>Quintana Roo</em>
                  </MenuItem>
                  <MenuItem value="San Luis Potosí">
                    <em>San Luis Potosí</em>
                  </MenuItem>
                  <MenuItem value="Sinaloa">
                    <em>Sinaloa</em>
                  </MenuItem>
                  <MenuItem value="Sonora">
                    <em>Sonora</em>
                  </MenuItem>
                  <MenuItem value="Tabasco">
                    <em>Tabasco</em>
                  </MenuItem>
                  <MenuItem value="Tamaulipas">
                    <em>Tamaulipas</em>
                  </MenuItem>
                  <MenuItem value="Tlaxcala">
                    <em>Tlaxcala</em>
                  </MenuItem>
                  <MenuItem value="Veracruz">
                    <em>Veracruz</em>
                  </MenuItem>
                  <MenuItem value="Yucatán">
                    <em>Yucatán</em>
                  </MenuItem>
                  <MenuItem value="Zacatecas">
                    <em>Zacatecas</em>
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
                  label="Administrador"
                  multiline
                  name="administrador"
                  value={state.administrador}
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
                  // InputProps={{
                  //   inputComponent: TextMaskCustom,
                  // }}
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
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <TextField
                  variant="outlined"
                  label="Direccion"
                  name="direccion"
                  value={state.direccion}
                  onChange={handleChangeText}
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
                  label="Descripcion"
                  name="descripcion"
                  value={state.descripcion}
                  onChange={handleChangeText}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={crearSucursal} color="primary">
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
      {viewType === "Tabla" ? (
        <Paper className={classes.rootTable}>
          <TableContainer className={classes.container}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead style={{ background: "#3f51b5" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Nombre</TableCell>
                  <TableCell style={{ color: "white" }}>Estado</TableCell>
                  <TableCell style={{ color: "white" }}>
                    Administrador
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Telefono</TableCell>
                  <TableCell style={{ color: "white" }}>Correo</TableCell>
                  <TableCell style={{ color: "white" }}>Estatus</TableCell>
                  <TableCell style={{ color: "white" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sucursales.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.estado}</TableCell>
                    <TableCell>{row.administrador}</TableCell>
                    <TableCell>{row.telefono}</TableCell>
                    <TableCell>{row.correo}</TableCell>
                    <TableCell>{row.estatus ? "Activo" : "Inactivo"}</TableCell>
                    <TableCell>
                      <IconButton aria-label="settings">
                        <Link to={`/detallesucursal/${row.id}`}>
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
          {sucursales.map((item) => (
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
                  subheader={
                    monthNames[new Date(item.created_at).getMonth()] +
                    " " +
                    new Date(item.created_at).getDate() +
                    ", " +
                    new Date(item.created_at).getFullYear()
                  }
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
                    {item.descripcion}
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
