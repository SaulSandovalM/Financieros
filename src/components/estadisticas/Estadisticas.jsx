import React from "react";
// import "./Common.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  paperone: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    backgroundSize: "cover",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Estadisticas() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography variant="h4">Estadisticas</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Vista</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="Vista"
              >
                <MenuItem value="mensual">Mensual</MenuItem>
                <MenuItem value="historico">Historico</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paperone}>
            <Typography style={{ color: "gray" }}>SERVICIOS</Typography>
            <Typography style={{ color: "gray" }}>218</Typography>
            <Typography style={{ color: "gray" }}>
              +60% desde el mes anterior
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paperone}>
            <Typography style={{ color: "gray" }}>VENTAS</Typography>
            <Typography style={{ color: "gray" }}>$ 25,450 MXN</Typography>
            <Typography style={{ color: "gray" }}>
              +30% desde el mes anterior
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paperone}>
            <Typography style={{ color: "gray" }}>TICKET PROMEDIO</Typography>
            <Typography style={{ color: "gray" }}>89</Typography>
            <Typography style={{ color: "gray" }}>
              +80% desde el mes anterior
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paperone}>
            <Typography style={{ color: "gray" }}>CLIENTE</Typography>
            <Typography style={{ color: "gray" }}>89</Typography>
            <Typography style={{ color: "gray" }}>
              +80% desde el mes anterior
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>VENTAS SEMANALES EN MXN</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>VENTAS POR SUCURSAL</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>RESERVAS POR COLABORADOR</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>COLABORADORES</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
