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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EditarReserva(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              Editar reserva
            </Typography>
            <Typography variant="h4">#20345</Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Paper style={{ padding: 20 }}>
            <div style={{ width: "100%" }}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Detalles reserva" {...a11yProps(0)} />
                  <Tab label="Confirmar y pago" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Fecha"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Sucursal"
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
                  <Grid item xs={6}>
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
                      label="Inicio"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Termina"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Nombre"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Apellidos"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Correo Electronico"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Celular"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Medio de contacto"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Metodo de pago"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button variant="contained" color="primary">
                      Guardar detalles
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography>Confirmar reserva</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Sucursal campestre</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Fecha"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Inicia"
                        variant="outlined"
                        style={{ width: "30%" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Termina"
                        variant="outlined"
                        style={{ width: "30%" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Duracion"
                        variant="outlined"
                        style={{ width: "30%" }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Cliente"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Telefono"
                        variant="outlined"
                        style={{ width: "47%" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Metodo de pago"
                        variant="outlined"
                        style={{ width: "47%" }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Servicio"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Colaborador"
                        variant="outlined"
                        style={{ width: "47%" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Monto"
                        variant="outlined"
                        style={{ width: "47%" }}
                      />
                    </div>
                  </Grid>
                  <Divider />
                  <Grid item xs={12}>
                    <Typography align="right">TOTAL $650 mxn</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{ display: "flex", justifyContent: "right" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "80%" }}
                    >
                      Cambiar detalles
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{ display: "flex", justifyContent: "left" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "80%" }}
                    >
                      Guardar y enviar
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
