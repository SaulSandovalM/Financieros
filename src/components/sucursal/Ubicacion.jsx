import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

export default function Ubicacion() {
  var URLactual = String(window.location).substr(-20);

  const [data, setData] = React.useState({
    cp: "",
    pais: "",
    estado: "",
    municipio: "",
    colonia: "",
    calle: "",
    cruzamientos: "",
    numExt: "",
    numInt: "",
    referencias: "",
  });
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    const itemsRefComprometidos = firebase
      .database()
      .ref(`empresa/-N-i-AiUDuAZjgNUpGA8/sucursales/${URLactual}/ubicacion`);
    listenComprometidos(itemsRefComprometidos);
    setLoading(false);
  }, []);

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      const firebasedata = snap.val();
      setData(firebasedata);
    });
  };

  function handleChangeText(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  }

  console.log(data);

  const update = () => {
    let updates = {};
    updates[
      "empresa/-N-i-AiUDuAZjgNUpGA8/sucursales/" + URLactual + "/ubicacion"
    ] = {
      cp: data.cp ? data.cp : "",
      pais: data.pais ? data.pais : "",
      estado: data.estado ? data.estado : "",
      municipio: data.municipio ? data.municipio : "",
      colonia: data.colonia ? data.colonia : "",
      calle: data.calle ? data.calle : "",
      cruzamientos: data.cruzamientos ? data.cruzamientos : "",
      numExt: data.numExt ? data.numExt : "",
      numInt: data.numInt ? data.numInt : "",
      referencias: data.referencias ? data.referencias : "",
    };
    firebase.database().ref().update(updates);
    alert("Se ha actualizado el fondo");
  };

  if (loading) {
    return <div>Cargando...</div>;
  } else {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Ubicacion</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Codigo postal"
            variant="outlined"
            name="cp"
            value={data.cp}
            onChange={handleChangeText}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Pais"
            variant="outlined"
            name="pais"
            value={data.pais}
            onChange={handleChangeText}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Estado"
            variant="outlined"
            name="estado"
            value={data.estado}
            onChange={handleChangeText}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Municipio"
            variant="outlined"
            name="municipio"
            value={data.municipio}
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
            label="Colonia"
            variant="outlined"
            name="colonia"
            value={data.colonia}
            onChange={handleChangeText}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Calle"
            variant="outlined"
            name="calle"
            value={data.calle}
            onChange={handleChangeText}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Cruzamientos"
            variant="outlined"
            name="cruzamientos"
            value={data.cruzamientos}
            onChange={handleChangeText}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Numero exterior"
            variant="outlined"
            name="numExt"
            value={data.numExt}
            onChange={handleChangeText}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Numero interior"
            variant="outlined"
            name="numInt"
            value={data.numInt}
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
            label="Referncias"
            variant="outlined"
            name="referencias"
            value={data.referencias}
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
