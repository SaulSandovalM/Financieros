import React, { useEffect, useState } from "react";
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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import firebase from "../../Firebase";

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

export default function Negocio() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [data, setData] = useState({
    nombre: "",
    tipo_persona: "",
    razon_social: "",
    administrador: "",
    rfc: "",
    clave: "",
    banco: "",
    cuenta: "",
    // clientes: [],
    // colaboradores: [],
    // reservas: [],
    // servicios: [],
    // sucursales: [],
    created_at: Date.now(),
    updated_at: Date.now(),
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const itemsRefData = firebase
      .database()
      .ref(`empresa/${"-N-q-Asdt5rdfghjklop"}/`);
    listenForData(itemsRefData);
  }, []);

  const listenForData = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      const data = snap.val();
      setData(data);
    });
  };

  function handleChangeText(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  }

  const update = () => {
    let updates = {};
    updates[`empresa/${"-N-q-Asdt5rdfghjklop"}/`] = {
      nombre: data.nombre,
      tipo_persona: data.tipo_persona,
      razon_social: data.razon_social,
      administrador: data.administrador,
      rfc: data.rfc,
      clave: data.clave,
      banco: data.banco,
      cuenta: data.cuenta,
      created_at: data.created_at ? data.created_at : Date.now(),
      updated_at: Date.now(),
    };
    firebase.database().ref().update(updates);
    alert("Se ha actualizado el fondo");
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
              {data.nombre}
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
          </Tabs>
          <TabPanel value={value} index={0} style={{ width: "86%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Generales</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  name="nombre"
                  value={data.nombre}
                  onChange={handleChangeText}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Imagen"
                  variant="outlined"
                  style={{ width: "100% " }}
                />
              </Grid>
              <Grid item xs={8}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Tipo de persona
                  </InputLabel>
                  <Select
                    name="tipo_persona"
                    value={data.tipo_persona}
                    onChange={handleChangeText}
                    label="Tipo de persona"
                  >
                    <MenuItem value="Persona Moral">
                      <em>Persona Moral</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Razon social"
                  variant="outlined"
                  style={{ width: "100%" }}
                  name="razon_social"
                  value={data.razon_social}
                  onChange={handleChangeText}
                />
              </Grid>
              <Grid item xs={8}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Administrador</InputLabel>
                  <Select
                    name="administrador"
                    value={data.administrador}
                    onChange={handleChangeText}
                    label="Administrador"
                  >
                    <MenuItem value="Personal">
                      <em>Personal</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Rfc"
                  variant="outlined"
                  style={{ width: "100%" }}
                  name="rfc"
                  value={data.rfc}
                  onChange={handleChangeText}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Clave"
                  variant="outlined"
                  style={{ width: "100%" }}
                  name="clave"
                  value={data.clave}
                  onChange={handleChangeText}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Banco"
                  variant="outlined"
                  style={{ width: "100%" }}
                  name="banco"
                  value={data.banco}
                  onChange={handleChangeText}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Cuenta"
                  variant="outlined"
                  style={{ width: "100%" }}
                  name="cuenta"
                  value={data.cuenta}
                  onChange={handleChangeText}
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
                  style={{ width: "100%" }}
                  value={
                    new Date(data.created_at).getDate() +
                    "/" +
                    (new Date(data.created_at).getMonth() + 1) +
                    "/" +
                    new Date(data.created_at).getFullYear() +
                    " a las " +
                    new Date(data.created_at).getHours() +
                    ":" +
                    new Date(data.created_at).getMinutes()
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Ultima modificacion"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={
                    new Date(data.updated_at).getDate() +
                    "/" +
                    (new Date(data.updated_at).getMonth() + 1) +
                    "/" +
                    new Date(data.updated_at).getFullYear() +
                    " a las " +
                    new Date(data.updated_at).getHours() +
                    ":" +
                    new Date(data.updated_at).getMinutes()
                  }
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
        </div>
      </Paper>
    </div>
  );
}
