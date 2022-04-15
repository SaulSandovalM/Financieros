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

export default function Colaboradores() {
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
    <Grid container>
      <Grid item xs={12}>
        <Typography>Colaboradores</Typography>
      </Grid>
      <Grid item xs={12}>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button style={{ background: "#e7e8fd" }}>
            <ListItemText primary="Mariana Martinez" />
          </ListItem>
        </List>
      </Grid>
      <Grid>
        <Typography>
          Esta tabla es informativa. Para modificar datos has click en el nombre
          de la sucursal relacionada para editar
        </Typography>
      </Grid>
    </Grid>
  );
}
