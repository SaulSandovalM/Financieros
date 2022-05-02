import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "../../Firebase";

const useStyles = makeStyles((theme) => ({
  back: {
    background: "#e7e8fd",
  },
}));

export default function Sucursales() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState([]);
  const [colaborador, setColaborador] = React.useState([]);
  const [coincidencia, setCoincidencia] = React.useState([]);
  const [change, setChange] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    const itemsRefComprometidos = firebase
      .database()
      .ref(`empresa/${"-N-i-AiUDuAZjgNUpGA8"}/sucursales/`);
    listenComprometidos(itemsRefComprometidos);

    const perro = colaborador.map((item) => item.idSucursal);
    const perro2 = state.map((item) => item.id);

    for (var i = 0; i < perro.length; i++) {
      for (var j = 0; j < perro2.length; j++) {
        if (perro[i] == perro2[j]) {
          const array = [];
          state.map((item) =>
            item.id === perro2[j] ? array.push(item) : null
          );
          setCoincidencia(array);
        }
      }
    }
  }, [change]);

  const listenComprometidos = (itemsRefComprometidos) => {
    itemsRefComprometidos.on("value", (snap) => {
      var sucursales = [];
      snap.forEach((child) => {
        sucursales.push({
          nombre: child.val().nombre,
          id: child.key,
        });
      });
      setState(sucursales);
      const itemsRefColaboradores = firebase
        .database()
        .ref(
          `empresa/${"-N-i-AiUDuAZjgNUpGA8"}/colaboradores/${URLactual}/sucursales/`
        );
      listenColaboradores(itemsRefColaboradores);
    });
  };

  const listenColaboradores = (itemsRefColaboradores) => {
    itemsRefColaboradores.on("value", (snap) => {
      var sucursales = [];
      snap.forEach((child) => {
        sucursales.push({
          idSucursal: child.val().idSucursal,
        });
      });
      setColaborador(sucursales);
      setChange(true);
      setLoading(false);
    });
  };

  if (loading) {
    return <div>Cargando...</div>;
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography>Sucursales</Typography>
        </Grid>
        <Grid item xs={12}>
          <List component="nav" aria-label="secondary mailbox folders">
            {coincidencia.map((sucursales) => (
              <ListItem button className={classes.back}>
                <ListItemText primary={sucursales.nombre} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Esta tabla es informativa. Para modificar datos has click en el
            nombre de la sucursal relacionada para editar
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
