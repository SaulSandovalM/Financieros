import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import firebase from "../../Firebase";

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

export default function Notificaciones() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [imagen, setImagen] = React.useState("");
  const [state, setState] = React.useState({
    nombre: "",
    apellido: "",
    rol: "",
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
      .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/colaboradores/${URLactual}`);
    listenComprometidos(itemsRefComprometidos);
    setLoading(false);
  }, []);

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      const firebasedata = snap.val();
      setState(firebasedata);
    });
  };

  const handleChangeCheack = (event) => {
    setChecked(event.target.checked);
  };

  //   function handleChangeText(evt) {
  //     const value = evt.target.value;
  //     setState({
  //       ...state,
  //       [evt.target.name]: value,
  //     });
  //   }

  const update = () => {
    const file = imagen;
    if (file) {
      const storageRef = firebase.storage().ref(`colaboradores/`);
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
              `empresa/${"-N-i-AiUDuAZjgNUpGA8"}/colaboradores/${URLactual}`
            ] = {
              nombre: state.nombre,
              apellido: state.apellido,
              rol: state.rol,
              estatus: true,
              telefono: state.telefono,
              correo: state.correo,
              fecha_nacimiento: state.fecha_nacimiento,
              genero: state.genero,
              presentacion: state.presentacion,
              created_at: Date.now(),
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
          rol: state.rol,
          estatus: true,
          telefono: state.telefono,
          correo: state.correo,
          fecha_nacimiento: state.fecha_nacimiento,
          genero: state.genero,
          presentacion: state.presentacion,
          created_at: Date.now(),
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
        <Typography>Prefencia de Notificaciones</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>Nueva reserva</Typography>
      </Grid>
      <Grid item xs={2}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheack}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      <Grid item xs={2}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheack}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography>Reserva cancelada</Typography>
      </Grid>
      <Grid item xs={2}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheack}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      <Grid item xs={2}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheack}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography>Reserva modificada</Typography>
      </Grid>
      <Grid item xs={2}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheack}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      <Grid item xs={2}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheack}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography>No show</Typography>
      </Grid>
      <Grid item xs={2}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheack}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      <Grid item xs={2}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheack}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography>Mensaje de clientes</Typography>
      </Grid>
      <Grid item xs={2}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheack}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      <Grid item xs={2}>
        <Checkbox
          checked={checked}
          onChange={handleChangeCheack}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Guardar cambios
        </Button>
      </Grid>
    </Grid>
  );
}
