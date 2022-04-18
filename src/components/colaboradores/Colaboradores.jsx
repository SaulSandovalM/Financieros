import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import IconButton from "@material-ui/core/IconButton";
import TableRow from "@material-ui/core/TableRow";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListIcon from "@material-ui/icons/List";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import AppsIcon from "@material-ui/icons/Apps";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Chip from "@material-ui/core/Chip";
import MuiAlert from "@material-ui/lab/Alert";
import firebase from "../../Firebase";
import { TextField } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  rootTable: {
    width: "100%",
  },
  container: {
    minHeight: "68vh",
  },
  button: {
    margin: theme.spacing(1),
    padding: 14.5,
    width: "100%",
  },
  dialog: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  formControlTwo: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "80%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Colaboradores() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [age, setAge] = React.useState("");
  const [viewType, setViewType] = React.useState("Tabla");
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [state, setState] = React.useState({
    nombre: "",
    rol: "",
    telefon: "",
    correo: "",
    estatus: true,
  });

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  function handleChangeText(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  useEffect(() => {
    setLoading(true);
    const itemsRefComprometidos = firebase
      .database()
      .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/colaboradores`);
    listenComprometidos(itemsRefComprometidos);
    setLoading(false);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      var colaboradores = [];
      snap.forEach((child) => {
        colaboradores.push({
          id: child.key,
          nombre: child.val().nombre,
          rol: child.val().rol,
          telefono: child.val().telefono,
          correo: child.val().correo,
          imagen: child.val().imagen,
          estatus: child.val().estatus,
        });
      });
      setData(colaboradores);
    });
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeView = (type) => {
    setViewType(type);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const crearColaborador = (e) => {
    e.preventDefault();
    const params = {
      nombre: state.nombre,
      rol: state.rol,
      telefono: state.telefono,
      correo: state.correo,
      estatus: true,
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    if (
      params.nombre &&
      params.rol &&
      params.telefono &&
      params.correo &&
      params.estatus &&
      params.created_at &&
      params.updated_at
    ) {
      firebase
        .database()
        .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/colaboradores`)
        .push(params)
        .then(() => {
          setSeverity("success");
          handleClickAlert();
          handleClose();
          setState({
            nombre: "",
            rol: "",
            telefono: "",
            correo: "",
            estatus: true,
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

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <div className={classes.root}>
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
      <Grid container spacing={2}>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Colaboradores</Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Filtrar por
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="Filtrar por"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextField
            variant="outlined"
            label="Buscar"
            className={classes.formControl}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<ListIcon />}
            onClick={() => handleChangeView("Tabla")}
          >
            Tabla
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<AppsIcon />}
            onClick={() => handleChangeView("Tarjetas")}
          >
            Tarjetas
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            className={classes.button}
            endIcon={<AddCircleIcon color="primary" />}
            onClick={handleClickOpen}
          >
            Colaborador
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        classes={{
          paper: classes.dialog,
        }}
      >
        <DialogTitle>Nueva sucursal</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <TextField
                  variant="outlined"
                  label="Nombre"
                  multiline
                  name="nombre"
                  value={state.nombre}
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
                <InputLabel>Rol</InputLabel>
                <Select
                  name="rol"
                  value={state.rol}
                  onChange={handleChangeText}
                  label="Rol"
                >
                  <MenuItem value="Colaborador">
                    <em>Colaborador</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControlTwo}
              >
                <TextField
                  variant="outlined"
                  label="Teléfono"
                  type="number"
                  multiline
                  name="telefono"
                  value={state.telefono}
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
                  value={state.correo}
                  onChange={handleChangeText}
                  name="correo"
                  label="Correo"
                />
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
      {viewType === "Tabla" ? (
        <Paper className={classes.rootTable}>
          <TableContainer className={classes.container}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead style={{ background: "#3f51b5" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Nombre</TableCell>
                  <TableCell style={{ color: "white" }}>Empresa</TableCell>
                  <TableCell style={{ color: "white" }}>Rol</TableCell>
                  <TableCell style={{ color: "white" }}>Telefono</TableCell>
                  <TableCell style={{ color: "white" }}>Correo</TableCell>
                  <TableCell style={{ color: "white" }}>Estatus</TableCell>
                  <TableCell style={{ color: "white" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.empresa}</TableCell>
                    <TableCell>{row.rol}</TableCell>
                    <TableCell>{row.telefono}</TableCell>
                    <TableCell>{row.correo}</TableCell>
                    <TableCell>{row.estatus ? "Activo" : "Inactivo"}</TableCell>
                    <TableCell>
                      <IconButton aria-label="settings">
                        <Link to={`/detallecolaborador/${row.id}`}>
                          <MoreVertIcon />
                        </Link>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={3}>
              <Card variant="outlined">
                <CardMedia
                  className={classes.media}
                  image={item.imagen}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography>{item.nombre}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.horario}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <IconButton
                    className={clsx(classes.expand)}
                    aria-label="show more"
                  >
                    <Chip
                      size="small"
                      label={item.estatus ? "Activo" : "Inactivo"}
                      color="primary"
                    />
                  </IconButton>
                  <IconButton aria-label="settings">
                    <Link to={`/detallecolaborador/${item.id}`}>
                      <MoreVertIcon />
                    </Link>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
