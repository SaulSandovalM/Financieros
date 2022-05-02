import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
  table: {
    width: "100%",
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
  formControlTwo: {
    width: "100%",
  },
  dialog: {
    position: "absolute",
    right: 0,
    top: 0,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Servicios() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();

  const [data, setData] = React.useState([]);
  const [servicios, setServicios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [coincidencia, setCoincidencia] = React.useState([]);
  const [change, setChange] = React.useState(false);
  const [state, setState] = React.useState({
    nombre: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    const itemsRefServicios = firebase
      .database()
      .ref(`empresa/-N-i-AiUDuAZjgNUpGA8/servicios`);
    listenServicios(itemsRefServicios);

    const perro = data.map((item) => item.idServicio);
    const perro2 = servicios.map((item) => item.id);

    for (var i = 0; i < perro.length; i++) {
      for (var j = 0; j < perro2.length; j++) {
        if (perro[i] == perro2[j]) {
          const array = [];
          servicios.map((item) =>
            item.id === perro2[j] ? array.push(item) : null
          );
          setCoincidencia(array);
        }
      }
    }
  }, [change]);

  const listenServicios = (itemsRefServicios) => {
    itemsRefServicios.on("value", (snap) => {
      var servicios = [];
      snap.forEach((child) => {
        servicios.push({
          id: child.key,
          duracion: child.val().duracion,
          estatus: child.val().estatus,
          garantia: child.val().garantia,
          nombre: child.val().nombre,
          precio: child.val().precio,
          precio_sin: child.val().precio_sin,
        });
      });
      setServicios(servicios);
      const itemsRefComprometidos = firebase
        .database()
        .ref(`empresa/-N-i-AiUDuAZjgNUpGA8/sucursales/${URLactual}/servicios`);
      listenComprometidos(itemsRefComprometidos);
    });
  };

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      var servicio = [];
      snap.forEach((child) => {
        servicio.push({
          id: child.key,
          idServicio: child.val().idServicio,
        });
      });
      setData(servicio);
      setChange(true);
      setLoading(false);
    });
  };

  function handleChangeText(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const crearServicio = (e) => {
    e.preventDefault();
    const params = {
      idServicio: state.nombre,
    };
    if (params.idServicio) {
      firebase
        .database()
        .ref(
          "empresa/-N-i-AiUDuAZjgNUpGA8/sucursales/" + URLactual + "/servicios"
        )
        .push(params)
        .then(() => {
          setSeverity("success");
          handleClickAlert();
          handleClose();
          setState({
            nombre: "",
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
  };

  if (loading) {
    return <div>Cargando...</div>;
  } else {
    return (
      <Grid container spacing={2}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity={severity}>
            {severity === "success" && "Se ha generado el servicio"}
            {severity === "error" && "Al parecer algo salio mal"}
            {severity === "warning" && "Por favor llena el formulario"}
          </Alert>
        </Snackbar>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleClose}
          classes={{
            paper: classes.dialog,
          }}
        >
          <DialogTitle>Nuevo servicio</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControlTwo}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Servicio
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="nombre"
                    value={state.nombre}
                    onChange={handleChangeText}
                    label="Servicio"
                  >
                    {servicios.map((item) => (
                      <MenuItem value={item.id}>{item.nombre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControlTwo}
                >
                  <TextField
                    variant="outlined"
                    label="Precio"
                    multiline
                    name="precio"
                    value={state.precio}
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
                    value={state.precio_sin}
                    onChange={handleChangeText}
                    name="precio_sin"
                    label="Precio sin descuento"
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
                    value={state.duracion}
                    onChange={handleChangeText}
                    name="duracion"
                    label="Duración"
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
                    label="Garantía"
                    name="garantia"
                    value={state.garantia}
                    onChange={handleChangeText}
                  />
                </FormControl>
              </Grid>*/}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={crearServicio} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Servicios</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              className={classes.button}
              endIcon={<AddCircleIcon color="primary" />}
              onClick={handleClickOpen}
            >
              Nuevo servicio
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer className={classes.container}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead style={{ background: "#3f51b5" }}>
                  <TableRow>
                    <TableCell style={{ color: "white" }}>Nombre</TableCell>
                    <TableCell style={{ color: "white" }}>Precio</TableCell>
                    <TableCell style={{ color: "white" }}>
                      Precio sin descuento
                    </TableCell>
                    <TableCell style={{ color: "white" }}>Duracion</TableCell>
                    <TableCell style={{ color: "white" }}>Garantia</TableCell>
                    <TableCell style={{ color: "white" }}>Estatus</TableCell>
                    <TableCell style={{ color: "white" }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coincidencia.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.nombre}</TableCell>
                      <TableCell>$ {row.precio}</TableCell>
                      <TableCell>$ {row.precio_sin}</TableCell>
                      <TableCell>{row.duracion}</TableCell>
                      <TableCell>{row.garantia} %</TableCell>
                      <TableCell>
                        {row.estatus ? "Activo" : "Inactivo"}
                      </TableCell>
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
      </Grid>
    );
  }
}
