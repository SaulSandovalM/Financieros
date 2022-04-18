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

export default function Mensajes() {
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Mensajes</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnsMensaje.map((column) => (
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
              {rowsMensaje
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columnsMensaje.map((column) => {
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
          count={rowsMensaje.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
}
