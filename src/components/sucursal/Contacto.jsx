import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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

export default function Contacto() {
  var URLactual = String(window.location).substr(-20);

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    setLoading(true);
    const itemsRefComprometidos = firebase
      .database()
      .ref(`sucursales/${URLactual}/contacto`);
    listenComprometidos(itemsRefComprometidos);
    setLoading(false);
  }, []);

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      const firebasedata = snap.val();
      setData(firebasedata);
      console.log(firebasedata);
    });
  };

  function handleChangeText(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  }

  const update = () => {
    let updates = {};
    updates["sucursales/" + URLactual + "/contacto"] = {
      telefono: data.telefono,
      telefono_dos: data.telefono_dos,
      facebook: data.facebook,
      enlace_facebook: data.enlace_facebook,
      instagram: data.instagram,
      enlace_instagram: data.enlace_instagram,
    };
    firebase.database().ref().update(updates);
    setSeverity("success");
    handleClickAlert();
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
        <Grid item xs={12}>
          <Typography>Contacto</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Telefono"
            variant="outlined"
            name="telefono"
            value={data.telefono}
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
            label="Telefono 2"
            variant="outlined"
            name="telefono_dos"
            value={data.telefono_dos}
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
            label="Usuario de facebook"
            variant="outlined"
            name="facebook"
            value={data.facebook}
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
            label="Enlace facebook"
            variant="outlined"
            name="enlace_facebook"
            value={data.enlace_facebook}
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
            label="Usuario de instagram"
            variant="outlined"
            name="instagram"
            value={data.instagram}
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
            label="Enlace instagram"
            variant="outlined"
            name="enlace_instagram"
            value={data.enlace_instagram}
            onChange={handleChangeText}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={update}>
            Guardar cambios
          </Button>
        </Grid>
      </Grid>
    );
  }
}
