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
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import firebase from "../../Firebase";
import Ubicacion from "./Ubicacion";
import Contacto from "./Contacto";
import Servicios from "./Servicios";
import Colaboradores from "./Colaboradores";
import Banner from "./Banner";
// import Configuracion from "./Configuracion";

const columnResenas = [
  { id: "fecha", label: "Fecha", width: "20%" },
  { id: "cliente", label: "Cliente", width: "20%" },
  { id: "comentario", label: "Comentario", width: "20%" },
  { id: "calificacion", label: "Calificacion", width: "20%" },
  { id: "estatus", label: "Estatus", width: "20%" },
];

function createDataResenas(fecha, cliente, comentario, calificacion, estatus) {
  return {
    fecha,
    cliente,
    comentario,
    calificacion,
    estatus,
  };
}

const rowResenas = [
  createDataResenas(
    "21/03/22",
    "Maria Rovira",
    "Comentario",
    "4.4",
    "Aprobado"
  ),
];

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
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
    padding: 14.5,
  },
}));

export default function DetalleSucursal() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(true);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    const itemsRefComprometidos = firebase
      .database()
      .ref(`sucursales/${URLactual}`);
    listenComprometidos(itemsRefComprometidos);
    setLoading(false);
  }, []);

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      const firebasedata = snap.val();
      setData(firebasedata);
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

  function handleChangeCheck(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  function handleChangeText(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  }

  const update = () => {
    let updates = {};
    updates["sucursales/" + URLactual] = {
      imagen: data.imagen,
      nombre: data.nombre,
      estado: data.estado,
      administrador: data.administrador,
      telefono: data.telefono,
      correo: data.correo,
      direccion: data.direccion,
      descripcion: data.descripcion,
      estatus: data.estatus,
      created_at: data.created_at,
      updated_at: Date.now(),
      empresa: data.empresa,
      tipoPersona: data.tipoPersona,
      buzonSocial: data.buzonSocial,
      rfc: data.rfc,
      banco: data.banco,
      cuenta: data.cuenta,
      clave: data.clave,
      ubicacion: data.ubicacion,
    };
    firebase.database().ref().update(updates);
    alert("Se ha actualizado el fondo");
  };

  if (loading) {
    return <div>Cargando...</div>;
  } else {
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
              <Tab label="Ubicación" {...a11yProps(2)} />
              <Tab label="Contacto" {...a11yProps(3)} />
              <Tab label="Servicios" {...a11yProps(4)} />
              <Tab label="Colaboradores" {...a11yProps(5)} />
              <Tab label="Reseñas" {...a11yProps(6)} />
              <Tab label="Banners" {...a11yProps(7)} />
              {/* <Tab label="Configuración" {...a11yProps(8)} /> */}
            </Tabs>
            <TabPanel value={value} index={0} style={{ width: "86%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Generales</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Nombre"
                    value={data.nombre}
                    name="nombre"
                    onChange={handleChangeText}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Empresa"
                    name="empresa"
                    value={data.empresa}
                    onChange={handleChangeText}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Tipo de persona
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={data.tipoPersona}
                      name="tipoPersona"
                      onChange={handleChangeText}
                      label="Tipo de persona"
                    >
                      <MenuItem value="Persona física">Persona física</MenuItem>
                      <MenuItem value="Persona física con actividad empresarial y profesional">
                        Persona física con actividad empresarial y profesional
                      </MenuItem>
                      <MenuItem value="Persona moral (una empresa)">
                        Persona moral (una empresa)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Buzon social"
                    variant="outlined"
                    name="buzonSocial"
                    value={data.buzonSocial}
                    onChange={handleChangeText}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Rfc"
                    variant="outlined"
                    name="rfc"
                    value={data.rfc}
                    onChange={handleChangeText}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Banco"
                    variant="outlined"
                    name="banco"
                    value={data.banco}
                    onChange={handleChangeText}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Cuenta"
                    variant="outlined"
                    name="cuenta"
                    value={data.cuenta}
                    onChange={handleChangeText}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Clave"
                    variant="outlined"
                    name="clave"
                    value={data.clave}
                    onChange={handleChangeText}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "100%" }}
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
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Ultima modificacion"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Horarios</Typography>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={handleChangeCheack}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography style={{ width: 150 }}>Lunes</Typography>
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography style={{ width: 150 }}>Martes</Typography>
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography style={{ width: 150 }}>Miercoles</Typography>
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography style={{ width: 150 }}>Jueves</Typography>
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography style={{ width: 150 }}>Viernes</Typography>
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography style={{ width: 150 }}>Sabado</Typography>
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <Typography style={{ width: 150 }}>Domingo</Typography>
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary">
                    Guardar cambios
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2} style={{ width: "86%" }}>
              <Ubicacion />
            </TabPanel>
            <TabPanel value={value} index={3} style={{ width: "86%" }}>
              <Contacto />
            </TabPanel>
            <TabPanel value={value} index={4} style={{ width: "86%" }}>
              <Servicios />
            </TabPanel>
            <TabPanel value={value} index={5} style={{ width: "86%" }}>
              <Colaboradores />
            </TabPanel>
            <TabPanel value={value} index={6} style={{ width: "86%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Reseñas</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columnResenas.map((column) => (
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
                        {rowResenas
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
                                {columnResenas.map((column) => {
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
                                      {column.format &&
                                      typeof value === "number"
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
                    count={rowResenas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={7} style={{ width: "86%" }}>
              <Banner />
            </TabPanel>
            {/* <TabPanel value={value} index={8} style={{ width: "86%" }}>
              <Configuracion />
            </TabPanel> */}
          </div>
        </Paper>
      </div>
    );
  }
}
