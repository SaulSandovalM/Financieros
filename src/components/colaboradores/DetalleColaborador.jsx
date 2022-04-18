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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import firebase from "../../Firebase";
import Horarios from "./Horarios";
import Sucursales from "./Sucursales";
import Servicios from "./Servicios";
import Notificaciones from "./Notificaciones";

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

export default function DetalleColaborador() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [imagen, setImagen] = React.useState("");
  const [state, setState] = React.useState({
    nombre: "",
    apellido: "",
    rol: "",
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
      .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/colaboradores/${URLactual}`);
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
      const storageRef = firebase.storage().ref(`colaboradores/`);
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
            updates[
              `empresa/${"-N-i-AiUDuAZjgNUpGA8"}/colaboradores/${URLactual}`
            ] = {
              nombre: state.nombre,
              apellido: state.apellido,
              rol: state.rol,
              estatus: true,
              telefono: state.telefono,
              correo: state.correo,
              fecha_nacimiento: state.fecha_nacimiento,
              genero: state.genero,
              presentacion: state.presentacion,
              created_at: Date.now(),
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
          rol: state.rol,
          estatus: true,
          telefono: state.telefono,
          correo: state.correo,
          fecha_nacimiento: state.fecha_nacimiento,
          genero: state.genero,
          presentacion: state.presentacion,
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
              Sucursal Nombre
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
            <Tab label="Horarios" {...a11yProps(1)} />
            <Tab label="Sucursales" {...a11yProps(2)} />
            <Tab label="Servicios" {...a11yProps(3)} />
            <Tab label="Notificaciones" {...a11yProps(4)} />
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Rol"
                  variant="outlined"
                  name="rol"
                  value={state.rol}
                  onChange={handleChangeText}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
                />
              </Grid>
              {/* <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Contraseña"
                  variant="outlined"
                  name="contraseña"
                  value={state.contraseña}
                  onChange={handleChangeText}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
                />
              </Grid> */}
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Fecha de nacimiento"
                  variant="outlined"
                  name="fecha_nacimiento"
                  type="date"
                  value={state.fecha_nacimiento}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChangeText}
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
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Presentacion"
                  variant="outlined"
                  name="presentacion"
                  value={state.presentacion}
                  onChange={handleChangeText}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  type="file"
                  label="Imagen"
                  variant="outlined"
                  onChange={handleUpload}
                  style={{ width: "100% " }}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  label="Calificacion"
                  variant="outlined"
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
                  label="Alta por"
                  variant="outlined"
                  disabled
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Ultima modoficacion"
                  variant="outlined"
                  disabled
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
            <Horarios />
          </TabPanel>
          <TabPanel value={value} index={2} style={{ width: "86%" }}>
            <Sucursales />
          </TabPanel>
          <TabPanel value={value} index={3} style={{ width: "86%" }}>
            <Servicios />
          </TabPanel>
          <TabPanel value={value} index={4} style={{ width: "86%" }}>
            <Notificaciones />
          </TabPanel>
        </div>
      </Paper>
    </div>
  );
}
