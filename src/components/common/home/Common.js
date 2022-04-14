import React from "react";
import "./Common.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const ImageOne =
  "https://firebasestorage.googleapis.com/v0/b/well-be-7e1c0.appspot.com/o/stats-01.jpg?alt=media&token=bed6ed02-7727-480d-9676-9c5253e5b33c";
const ImageTwo =
  "https://firebasestorage.googleapis.com/v0/b/well-be-7e1c0.appspot.com/o/stats-02.jpg?alt=media&token=4e45a6a6-b3b7-4537-b28c-d42ffc174f59";
const ImageThree =
  "https://firebasestorage.googleapis.com/v0/b/well-be-7e1c0.appspot.com/o/stats-03.jpg?alt=media&token=b0a147e6-c8eb-4ca7-8f42-47f9b9b5507b";

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
    backgroundImage: `url(${ImageOne})`,
    backgroundSize: "cover",
  },
  papertwo: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    backgroundImage: `url(${ImageTwo})`,
    backgroundSize: "cover",
  },
  paperthree: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    backgroundImage: `url(${ImageThree})`,
    backgroundSize: "cover",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Common() {
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
            <Typography variant="h4">Resumen de tu negocio</Typography>
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
        <Grid item xs={4}>
          <Paper className={classes.paperone}>
            <Typography style={{ color: "white" }}>RESERVACIONES</Typography>
            <Typography style={{ color: "white" }}>218</Typography>
            <Typography style={{ color: "white" }}>
              +60% desde el mes anterior
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.papertwo}>
            <Typography style={{ color: "white" }}>VENTAS</Typography>
            <Typography style={{ color: "white" }}>$ 25,450 MXN</Typography>
            <Typography style={{ color: "white" }}>
              +30% desde el mes anterior
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paperthree}>
            <Typography style={{ color: "white" }}>CLIENTE NUEVOS</Typography>
            <Typography style={{ color: "white" }}>89</Typography>
            <Typography style={{ color: "white" }}>
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
