import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
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

export default function Banner() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    imagen: "",
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
    const itemsRefComprometidos = firebase
      .database()
      .ref(`empresa/-N-i-AiUDuAZjgNUpGA8/sucursales/${URLactual}/banner`);
    listenComprometidos(itemsRefComprometidos);
    setLoading(false);
  }, []);

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      var servicios = [];
      snap.forEach((child) => {
        servicios.push({
          id: child.key,
          imagen: child.val().imagen,
        });
      });
      setData(servicios);
    });
  };

  const cargarImagen = (e) => {
    e.preventDefault();
    const file = state.imagen;
    const storageRef = firebase.storage().ref(`sucursales/${file.name}`);
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
          const params = {
            imagen: url,
          };
          if (params.imagen) {
            firebase
              .database()
              .ref(
                "empresa/-N-i-AiUDuAZjgNUpGA8/sucursales/" +
                  URLactual +
                  "/banner"
              )
              .push(params)
              .then(() => {
                setSeverity("success");
                handleClickAlert();
                handleClose();
                setState({
                  imagen: "",
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
        })
    );
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setState({
      imagen: file,
    });
  };

  if (loading) {
    return <div>Cargando...</div>;
  } else {
    return (
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Banner</Typography>
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
              agregar imagen
            </Button>
          </Grid>
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
            <DialogTitle>Nuevo servicio</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControlTwo}
                  >
                    <TextField
                      variant="outlined"
                      label="Carga una imagen"
                      type="file"
                      onChange={handleUpload}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ width: "100%" }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={cargarImagen} color="primary">
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
          {data.map((item) => (
            <Grid item xs={4}>
              <CardMedia
                image={item.imagen}
                style={{ width: "100%", height: 200 }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}
