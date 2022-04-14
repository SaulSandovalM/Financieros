import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  rootTable: {
    width: "100%",
  },
  container: {
    minHeight: "68vh",
  },
}));

export default function DetalleReserva(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" style={{ marginRight: 30 }}>
              Detalle de reserva
            </Typography>
            <Typography variant="h4">#20345</Typography>
          </div>
        </Grid>
      </Grid>
      <Paper style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Fecha"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Inicio"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Termina"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Duración"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Divider />
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Cliente"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Telefono"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Divider />
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Servicio"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Colaborador"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Sucursal"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Divider />
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Metodo de pago"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Monto"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Garantia"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Estatus garantia"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Editar reserva
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Cambiar estatus
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
