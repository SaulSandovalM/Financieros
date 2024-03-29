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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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

export default function Colaboradores() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [colaboradores, setColaboradores] = React.useState([]);
  const [coincidencia, setCoincidencia] = React.useState([]);
  const [change, setChange] = React.useState(false);
  const [state, setState] = React.useState({
    colaborador: "",
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
    const itemsRefColaboradores = firebase
      .database()
      .ref(`empresa/-N-i-AiUDuAZjgNUpGA8/colaboradores/`);
    listenColaboradores(itemsRefColaboradores);

    const perro = data.map((item) => item.idColaborador);
    const perro2 = colaboradores.map((item) => item.id);

    for (var i = 0; i < perro.length; i++) {
      for (var j = 0; j < perro2.length; j++) {
        if (perro[i] == perro2[j]) {
          const array = [];
          colaboradores.map((item) =>
            item.id === perro2[j] ? array.push(item) : null
          );
          setCoincidencia(array);
        }
      }
    }
  }, [change]);

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      var colaboradores = [];
      snap.forEach((child) => {
        colaboradores.push({
          id: child.key,
          idColaborador: child.val().idColaborador,
        });
      });
      setData(colaboradores);
      setChange(true);
      setLoading(false);
    });
  };

  const listenColaboradores = (itemsRefColaboradores) => {
    itemsRefColaboradores.on("value", (snap) => {
      var colaboradores = [];
      snap.forEach((child) => {
        colaboradores.push({
          id: child.key,
          nombre: child.val().nombre,
          apellido: child.val().apellido,
          rol: child.val().rol,
          estatus: child.val().estatus,
        });
      });
      setColaboradores(colaboradores);
      const itemsRefComprometidos = firebase
        .database()
        .ref(
          `empresa/-N-i-AiUDuAZjgNUpGA8/sucursales/${URLactual}/colaboradores`
        );
      listenComprometidos(itemsRefComprometidos);
    });
  };

  function handleChangeText(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  //   const update = () => {
  //     let updates = {};
  //     updates["sucursales/" + URLactual + "/contacto"] = {
  //       telefono: data.telefono,
  //       telefono_dos: data.telefono_dos,
  //       facebook: data.facebook,
  //       enlace_facebook: data.enlace_facebook,
  //       instagram: data.instagram,
  //       enlace_instagram: data.enlace_instagram,
  //     };
  //     firebase.database().ref().update(updates);
  //     setSeverity("success");
  //     handleClickAlert();
  //   };

  const crearColaborador = (e) => {
    e.preventDefault();
    const params = {
      idColaborador: state.colaborador,
    };
    if (params.idColaborador) {
      firebase
        .database()
        .ref(
          "empresa/-N-i-AiUDuAZjgNUpGA8/sucursales/" +
            URLactual +
            "/colaboradores"
        )
        .push(params)
        .then(() => {
          const add = {
            idSucursal: URLactual,
          };
          firebase
            .database()
            .ref(
              "empresa/-N-i-AiUDuAZjgNUpGA8/colaboradores/" +
                state.colaborador +
                "/sucursales"
            )
            .push(add)
            .then(() => {
              setSeverity("success");
              handleClickAlert();
              handleClose();
              setState({
                colaborador: "",
              });
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
            {severity === "success" && "Se ha generado al reserva"}
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
          <DialogTitle>Agregar Colaborador</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControlTwo}
                >
                  <InputLabel>Colaborador</InputLabel>
                  <Select
                    name="colaborador"
                    value={state.colaborador}
                    onChange={handleChangeText}
                    label="Colaborador"
                  >
                    {colaboradores.map((item) => (
                      <MenuItem value={item.id}>
                        <em>
                          {item.nombre} {item.apellido}
                        </em>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={crearColaborador} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Colaboradores</Typography>
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
              Agregar colaborador
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer className={classes.container}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead style={{ background: "#3f51b5" }}>
                  <TableRow>
                    <TableCell style={{ color: "white" }}>
                      Colaborador
                    </TableCell>
                    <TableCell style={{ color: "white" }}>Rol</TableCell>
                    <TableCell style={{ color: "white" }}>Dias</TableCell>
                    <TableCell style={{ color: "white" }}>Horarios</TableCell>
                    <TableCell style={{ color: "white" }}>Estatus</TableCell>
                    <TableCell style={{ color: "white" }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coincidencia.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.nombre}</TableCell>
                      <TableCell>{row.rol}</TableCell>
                      <TableCell>{row.dias}</TableCell>
                      <TableCell>{row.horarios}</TableCell>
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
