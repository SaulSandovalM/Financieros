import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import firebase from "../../Firebase";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EditarReserva(props) {
  const classes = useStyles();
  var URLactual = String(window.location).substr(-20);

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reservas, setReservas] = useState();
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [change, setChange] = useState(false);
  const [state, setState] = useState({
    cliente: "",
    correo: "",
    telefono: "",
    servicio: "",
    duracion: "",
    precio: "",
    sucursal: "",
    colaborador: "",
    fecha: "",
    estatus: true,
    numero_reserva: "",
  });

  useEffect(() => {
    const itemsRefClientes = firebase
      .database()
      .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/clientes/`);
    listenForClientes(itemsRefClientes);
  }, [change]);

  const listenForClientes = (itemsRef) => {
    setLoading(true);
    itemsRef.on("value", (snap) => {
      if (snap.exists()) {
        var cliente = [];
        snap.forEach((child) => {
          cliente.push({
            nombre: child.val().nombre,
            apellido: child.val().apellido,
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
        .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/reservas/${URLactual}`);
      listenForItems(itemsRef);
    });
  };

  const listenForItems = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      const data = snap.val();
      setState(data);
      setChange(true);
      setLoading(false);
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  if (loading) {
    return <div>Cargando ...</div>;
  } else {
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h4" style={{ marginRight: 30 }}>
                Editar reserva
              </Typography>
              <Typography variant="h4"># {state.numero_reserva}</Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Paper style={{ padding: 20 }}>
              <div style={{ width: "100%" }}>
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                  >
                    <Tab label="Detalles reserva" {...a11yProps(0)} />
                    <Tab label="Confirmar y pago" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Fecha"
                        variant="outlined"
                        name="fecha"
                        value={
                          new Date(state.fecha).getDate() +
                          " " +
                          monthNames[new Date(state.fecha).getMonth()] +
                          " " +
                          new Date(state.fecha).getFullYear()
                        }
                        onChange={handleChangeText}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Sucursal"
                        variant="outlined"
                        name="sucursal"
                        value={sucursales.map((item) =>
                          item.id === state.sucursal ? item.nombre : null
                        )}
                        onChange={handleChangeText}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Colaborador"
                        variant="outlined"
                        name="colaborador"
                        value={colaboradores.map((item) =>
                          item.id === state.colaborador ? item.nombre : null
                        )}
                        onChange={handleChangeText}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Servicio"
                        variant="outlined"
                        name="servicio"
                        value={servicios.map((item) =>
                          item.id === state.servicio ? item.nombre : null
                        )}
                        onChange={handleChangeText}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Inicio"
                        variant="outlined"
                        name="inicio"
                        value={
                          new Date(state.fecha).getHours() +
                          ":" +
                          (new Date(state.fecha).getMinutes() === 0
                            ? "00"
                            : new Date(state.fecha).getMinutes())
                        }
                        onChange={handleChangeText}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Termina"
                        variant="outlined"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                        name="nombre"
                        value={clientes.map((item) =>
                          item.id === state.cliente ? item.nombre : null
                        )}
                        onChange={handleChangeText}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Apellidos"
                        variant="outlined"
                        name="apellidos"
                        value={clientes.map((item) =>
                          item.id === state.cliente ? item.apellido : null
                        )}
                        onChange={handleChangeText}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Correo Electronico"
                        variant="outlined"
                        name="correo"
                        value={clientes.map((item) =>
                          item.id === state.cliente ? item.correo : null
                        )}
                        onChange={handleChangeText}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Celular"
                        variant="outlined"
                        name="correo"
                        value={clientes.map((item) =>
                          item.id === state.cliente ? item.telefono : null
                        )}
                        onChange={handleChangeText}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Medio de contacto"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Metodo de pago"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button variant="contained" color="primary">
                        Guardar detalles
                      </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Typography>Confirmar reserva</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Sucursal campestre</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Fecha"
                        variant="outlined"
                        value={
                          new Date(state.fecha).getDate() +
                          " " +
                          monthNames[new Date(state.fecha).getMonth()] +
                          " " +
                          new Date(state.fecha).getFullYear()
                        }
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="Inicia"
                          variant="outlined"
                          value={
                            new Date(state.fecha).getHours() +
                            ":" +
                            (new Date(state.fecha).getMinutes() === 0
                              ? "00"
                              : new Date(state.fecha).getMinutes())
                          }
                          style={{ width: "30%" }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Termina"
                          variant="outlined"
                          style={{ width: "30%" }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Duracion"
                          variant="outlined"
                          value={servicios.map((item) =>
                            item.id === state.servicio ? item.duracion : null
                          )}
                          style={{ width: "30%" }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Cliente"
                        variant="outlined"
                        value={clientes.map((item) =>
                          item.id === state.cliente ? item.nombre : null
                        )}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="Telefono"
                          variant="outlined"
                          value={clientes.map((item) =>
                            item.id === state.cliente ? item.telefono : null
                          )}
                          style={{ width: "47%" }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Metodo de pago"
                          variant="outlined"
                          style={{ width: "47%" }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-basic"
                        label="Servicio"
                        variant="outlined"
                        value={servicios.map((item) =>
                          item.id === state.servicio ? item.nombre : null
                        )}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="Colaborador"
                          variant="outlined"
                          value={colaboradores.map((item) =>
                            item.id === state.colaborador ? item.nombre : null
                          )}
                          style={{ width: "47%" }}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Monto"
                          variant="outlined"
                          value={servicios.map((item) =>
                            item.id === state.servicio ? item.precio_sin : null
                          )}
                          style={{ width: "47%" }}
                        />
                      </div>
                    </Grid>
                    <Divider />
                    <Grid item xs={12}>
                      <Typography align="right">
                        TOTAL $
                        {servicios.map((item) =>
                          item.id === state.servicio ? item.precio_sin : null
                        )}
                        mxn
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{ display: "flex", justifyContent: "right" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "80%" }}
                      >
                        Cambiar detalles
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{ display: "flex", justifyContent: "left" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "80%" }}
                      >
                        Guardar y enviar
                      </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
