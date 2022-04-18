import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
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

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Reservas() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(true);
  const [imagen, setImagen] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
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
        <Typography>Historial de reservas</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer className={classes.container}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={{ background: "#3f51b5" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Fecha</TableCell>
                <TableCell style={{ color: "white" }}>Hora</TableCell>
                <TableCell style={{ color: "white" }}>Servicio</TableCell>
                <TableCell style={{ color: "white" }}>Colaborador</TableCell>
                <TableCell style={{ color: "white" }}>Sucursal</TableCell>
                <TableCell style={{ color: "white" }}>Monto</TableCell>
                <TableCell style={{ color: "white" }}>Estatus</TableCell>
                <TableCell style={{ color: "white" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell>{row.hora}</TableCell>
                  <TableCell>{row.servicio}</TableCell>
                  <TableCell>{row.colaborador}</TableCell>
                  <TableCell>{row.sucursal}</TableCell>
                  <TableCell>{row.monto}</TableCell>
                  <TableCell>{row.estatus ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell>
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
