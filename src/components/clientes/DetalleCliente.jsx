import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Reservas from "./Reservas";
import Sucursales from "./Sucursales";
import firebase from "../../Firebase";
import Mensajes from "./Mensajes";

const columns = [
  { id: "fecha", label: "Fecha", width: "12%" },
  { id: "hora", label: "Hora", width: "12%" },
  { id: "servicio", label: "Servicio", width: "12%" },
  { id: "colaborador", label: "Colaborador", width: "12%" },
  { id: "sucursal", label: "Sucursal", width: "12%" },
  { id: "monto", label: "Monto", width: "12%" },
  { id: "estatus", label: "Estatus", width: "12%" },
  { id: "acciones", label: "Acciones", width: "12%" },
];

function createData(
  fecha,
  hora,
  servicio,
  colaborador,
  sucursal,
  monto,
  estatus,
  acciones
) {
  return {
    fecha,
    hora,
    servicio,
    colaborador,
    sucursal,
    monto,
    estatus,
    acciones,
  };
}

const rows = [
  createData(
    "12/03/2022",
    "11:40",
    "Lavado de cabello",
    "Luis Jimenez",
    "Campestre",
    "$ 350",
    "Activo",
    ""
  ),
];

const columnsMensaje = [
  { id: "reserva", label: "Reserva", width: "10%" },
  { id: "autor", label: "Autor", width: "10%" },
  { id: "mensaje", label: "Mensaje", width: "80%" },
];

function createDataMensaje(reserva, autor, mensaje) {
  return {
    reserva,
    autor,
    mensaje,
  };
}

const rowsMensaje = [createDataMensaje("122143", "", "Mensaje")];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootTabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  container: {
    minHeight: "68vh",
  },
  rootImage: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  rootList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    width: "100%",
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function DetalleCliente() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(true);
  const [imagen, setImagen] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState({
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    fecha_nacimiento: "",
    genero: "",
    presentacion: "",
    created_at: "",
    updated_at: "",
    estatus: true,
  });

  useEffect(() => {
    setLoading(true);
    const itemsRefComprometidos = firebase
      .database()
      .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/clientes/${URLactual}`);
    listenComprometidos(itemsRefComprometidos);
    setLoading(false);
  }, []);

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      const firebasedata = snap.val();
      setState(firebasedata);
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCheack = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleChangeText(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setImagen(file);
  };

  const update = () => {
    const file = imagen;
    if (file) {
      const storageRef = firebase.storage().ref(`clientes/`);
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
            let updates = {};
            updates[`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/clientes/${URLactual}`] =
              {
                nombre: state.nombre,
                apellido: state.apellido,
                telefono: state.telefono,
                correo: state.correo,
                fecha_nacimiento: state.fecha_nacimiento,
                genero: state.genero,
                estatus: true,
                created_at: state.created_at,
                updated_at: Date.now(),
                imagen: url,
              };
            firebase.database().ref().update(updates);
            alert("Se ha actualizado el fondo");
          })
      );
    } else {
      let updates = {};
      updates[`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/colaboradores/${URLactual}`] =
        {
          nombre: state.nombre,
          apellido: state.apellido,
          telefono: state.telefono,
          correo: state.correo,
          fecha_nacimiento: state.fecha_nacimiento,
          genero: state.genero,
          estatus: true,
          created_at: state.created_at,
          updated_at: Date.now(),
          imagen: state.imagen,
        };
      firebase.database().ref().update(updates);
      alert("Se ha actualizado el fondo");
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography variant="h4" style={{ marginRight: 30 }}>
              Nombre
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Paper style={{ marginTop: 20, width: "100%" }}>
        <div className={classes.rootTabs}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Generales" {...a11yProps(0)} />
            <Tab label="Reservas" {...a11yProps(1)} />
            <Tab label="Sucursales" {...a11yProps(2)} />
            <Tab label="Mensajes" {...a11yProps(3)} />
            {/* <Tab label="Notificaciones" {...a11yProps(4)} /> */}
          </Tabs>
          <TabPanel value={value} index={0} style={{ width: "86%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Generales</Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  name="nombre"
                  value={state.nombre}
                  onChange={handleChangeText}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Apellido"
                  variant="outlined"
                  name="apellido"
                  value={state.apellido}
                  onChange={handleChangeText}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Telefono"
                  variant="outlined"
                  name="telefono"
                  value={state.telefono}
                  onChange={handleChangeText}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Correo"
                  variant="outlined"
                  name="correo"
                  value={state.correo}
                  onChange={handleChangeText}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Fecha de nacimiento"
                  variant="outlined"
                  type="date"
                  name="fecha_nacimiento"
                  value={state.fecha_nacimiento}
                  onChange={handleChangeText}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={8}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Género
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="genero"
                    value={state.genero}
                    onChange={handleChangeText}
                    label="Género"
                  >
                    <MenuItem value="Hombre">
                      <em>Hombre</em>
                    </MenuItem>
                    <MenuItem value="Mujer">
                      <em>Mujer</em>
                    </MenuItem>
                    <MenuItem value="Otro">
                      <em>Otro</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Imagen"
                  variant="outlined"
                  type="file"
                  onChange={handleUpload}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100% " }}
                />
              </Grid>
            </Grid>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Fecha de alta"
                  variant="outlined"
                  value={
                    new Date(state.created_at).getDate() +
                    "/" +
                    (new Date(state.created_at).getMonth() + 1) +
                    "/" +
                    new Date(state.created_at).getFullYear() +
                    " a las " +
                    new Date(state.created_at).getHours() +
                    ":" +
                    new Date(state.created_at).getMinutes()
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Ultima modificacion"
                  variant="outlined"
                  value={
                    new Date(state.updated_at).getDate() +
                    "/" +
                    (new Date(state.updated_at).getMonth() + 1) +
                    "/" +
                    new Date(state.updated_at).getFullYear() +
                    " a las " +
                    new Date(state.updated_at).getHours() +
                    ":" +
                    new Date(state.updated_at).getMinutes()
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Calificacion"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Alta por"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Ultima modoficacion"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={update}>
                  Guardar cambios
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1} style={{ width: "86%" }}>
            <Reservas />
          </TabPanel>
          <TabPanel value={value} index={2} style={{ width: "86%" }}>
            <Sucursales />
          </TabPanel>
          <TabPanel value={value} index={3} style={{ width: "86%" }}>
            <Mensajes />
          </TabPanel>
          {/* <TabPanel value={value} index={4} style={{ width: "86%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Prefencia de Notificaciones</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Nueva reserva</Typography>
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Reserva cancelada</Typography>
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Reserva modificada</Typography>
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>No show</Typography>
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Mensaje de empresa</Typography>
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheack}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Guardar cambios
                </Button>
              </Grid>
            </Grid>
          </TabPanel> */}
        </div>
      </Paper>
    </div>
  );
}
