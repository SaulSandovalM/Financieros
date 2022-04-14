import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
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

export default function Ubicacion() {
  var URLactual = String(window.location).substr(-20);

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    const itemsRefComprometidos = firebase
      .database()
      .ref(`sucursales/${URLactual}/ubicacion`);
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

  const update = () => {
    let updates = {};
    updates["sucursales/" + URLactual + "/ubicacion"] = {
      cp: data.cp,
      pais: data.pais,
      estado: data.estado,
      municipio: data.municipio,
      colonia: data.colonia,
      calle: data.calle,
      cruzamientos: data.cruzamientos,
      numExt: data.numExt,
      numInt: data.numInt,
      referencias: data.referencias,
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
