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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import firebase from "../../Firebase";
import Colaboradores from "./Colaboradores";
import Sucursal from "./Sucursal";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const columns = [
  { id: "sucursal", label: "Sucursal", width: "14%" },
  { id: "precio", label: "Precio", width: "14%" },
  { id: "preciosin", label: "Precio sin descuento", width: "14%" },
  { id: "duracion", label: "Duracion", width: "14%" },
  { id: "garantia", label: "Garantia para reservar", width: "14%" },
  { id: "estatus", label: "Estatus", width: "14%" },
  { id: "acciones", label: "Acciones", width: "14%" },
];

function createData(
  sucursal,
  precio,
  preciosin,
  duracion,
  garantia,
  estatus,
  acciones
) {
  return {
    sucursal,
    precio,
    preciosin,
    duracion,
    garantia,
    estatus,
    acciones,
  };
}

const rows = [
  createData("altabrisa", "$ 350", "$ 500", "15", "50%", "Activo", ""),
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

export default function DetalleServicio() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(true);
  // const [state, setState] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  // });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [imagen, setImagen] = React.useState("");
  const [state, setState] = React.useState({
    nombre: "",
    descripcion: "",
    tipo_servicio: "",
    disponible_para: "",
    created_at: Date.now(),
    updated_at: Date.now(),
  });

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

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    const itemsRefComprometidos = firebase
      .database()
      .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/servicios/${URLactual}`);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setImagen(file);
  };

  const update = () => {
    const file = imagen;
    if (file) {
      const storageRef = firebase.storage().ref(`servicios/`);
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
              `empresa/${"-N-i-AiUDuAZjgNUpGA8"}/servicios/${URLactual}`
            ] = {
              nombre: state.nombre,
              descripcion: state.descripcion,
              tipo_servicio: state.tipo_servicio,
              disponible_para: state.disponible_para,
              imagen: url,
              created_at: Date.now(),
              updated_at: Date.now(),
              duracion: state.duracion,
              estatus: state.estatus,
              garantia: state.garantia,
              precio: state.precio,
              precio_sin: state.precio_sin,
              sucursal: state.sucursal,
            };
            firebase.database().ref().update(updates);
            alert("Se ha actualizado el fondo");
          })
      );
    } else {
      let updates = {};
      updates[`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/servicios/${URLactual}`] = {
        nombre: state.nombre,
        descripcion: state.descripcion,
        tipo_servicio: state.tipo_servicio,
        disponible_para: state.disponible_para,
        imagen: state.imagen,
        created_at: Date.now(),
        updated_at: Date.now(),
        duracion: state.duracion,
        estatus: state.estatus,
        garantia: state.garantia,
        precio: state.precio,
        precio_sin: state.precio_sin,
        sucursal: state.sucursal,
      };
      firebase.database().ref().update(updates);
      alert("Se ha actualizado el fondo");
    }
  };

  return (
    <div>
      <Grid container>
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
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography variant="h4" style={{ marginRight: 30 }}>
              {state.nombre}
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
            <Tab label="Colaboradores" {...a11yProps(1)} />
            <Tab label="Sucursal" {...a11yProps(2)} />
            {/* <Tab label="Precio" {...a11yProps(3)} /> */}
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
                  value={state.nombre}
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
                  label="Descripcion"
                  variant="outlined"
                  name="descripcion"
                  multiline
                  value={state.descripcion}
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
                    Tipo de servicio
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="tipo_servicio"
                    value={state.tipo_servicio}
                    onChange={handleChangeText}
                    label="Tipo de servicio"
                  >
                    <MenuItem value="cabello">
                      <em>cabello</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Disponible para
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="disponible_para"
                    value={state.disponible_para}
                    onChange={handleChangeText}
                    label="Disponible para"
                  >
                    <MenuItem value="Hombres">
                      <em>Hombres</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Etiquetas"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Grid> */}
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
            <Colaboradores />
          </TabPanel>
          <TabPanel value={value} index={2} style={{ width: "86%" }}>
            <Sucursal />
          </TabPanel>
          <TabPanel value={value} index={3} style={{ width: "86%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Reseñas</Typography>
              </Grid>
              <Grid item xs={12}>
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
                      {rows
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
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
            </Grid>
          </TabPanel>
          {/* <TabPanel value={value} index={4} style={{ width: "86%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Precio</Typography>
              </Grid>
              <Grid item xs={12}>
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
                      {rows
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
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
            </Grid>
          </TabPanel> */}
        </div>
      </Paper>
    </div>
  );
}
