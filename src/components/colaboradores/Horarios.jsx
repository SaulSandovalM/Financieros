import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
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

export default function Horarios() {
  var URLactual = String(window.location).substr(-20);

  const classes = useStyles();
  const [checked, setChecked] = React.useState({
    lunes: true,
    martes: true,
    miercoles: true,
    jueves: true,
    viernes: true,
    sabado: true,
    domingo: true,
  });
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState({
    selectedMonday: "",
    selectedMondayEnd: "",
    selectedTuesday: "",
    selectedTuesdayEnd: "",
    selectedWednesday: "",
    selectedWednesdayEnd: "",
    selectedThursday: "",
    selectedThursdayEnd: "",
    selectedFriday: "",
    selectedFridayEnd: "",
    selectedSaturday: "",
    selectedSaturdayEnd: "",
    selectedSunday: "",
    selectedSundayEnd: "",
  });

  useEffect(() => {
    setLoading(true);
    const itemsRefComprometidos = firebase
      .database()
      .ref(
        `empresa/${"-N-i-AiUDuAZjgNUpGA8"}/colaboradores/${URLactual}/horarios`
      );
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
    const value = event.target.checked;
    setChecked({
      ...checked,
      [event.target.name]: value,
    });
  };

  const update = () => {
    let updates = {};
    updates[
      `empresa/${"-N-i-AiUDuAZjgNUpGA8"}/colaboradores/${URLactual}/horarios`
    ] = {
      selectedMonday: state.selectedMonday,
      selectedMondayEnd: state.selectedMondayEnd,
      estatusMonday: checked.lunes,
      selectedTuesday: state.selectedTuesday,
      selectedTuesdayEnd: state.selectedTuesdayEnd,
      estatusTuesdat: checked.martes,
      selectedWednesday: state.selectedWednesday,
      selectedWednesdayEnd: state.selectedWednesdayEnd,
      estatusWednesday: checked.miercoles,
      selectedThursday: state.selectedThursday,
      selectedThursdayEnd: state.selectedThursdayEnd,
      estatusThursdat: checked.jueves,
      selectedFriday: state.selectedFriday,
      selectedFridayEnd: state.selectedFridayEnd,
      estatusFriday: checked.viernes,
      selectedSaturday: state.selectedSaturday,
      selectedSaturdayEnd: state.selectedSaturdayEnd,
      estatusSaturday: checked.sabado,
      selectedSunday: state.selectedSunday,
      selectedSundayEnd: state.selectedSundayEnd,
      estatusSunday: checked.domingo,
    };
    firebase.database().ref().update(updates);
    alert("Se ha actualizado el fondo");
  };

  console.log(state.selectedMonday);

  const onChange = (item) => {
    // console.log(item);
    // should print something like { name: "startDate", value: "the date object" }
    setState({ ...state, [item.name]: item.value });
  };

  if (loading) {
    return <div>Cargando...</div>;
  } else {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Horarios</Typography>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              name="lunes"
              checked={checked.lunes}
              onChange={handleChangeCheack}
            />
            <Typography style={{ width: 150 }}>Lunes</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedMonday}
                onChange={(date) =>
                  onChange({ name: "selectedMonday", value: date })
                }
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedMondayEnd}
                onChange={(date) =>
                  onChange({ name: "selectedMondayEnd", value: date })
                }
              />
            </MuiPickersUtilsProvider>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              name="martes"
              checked={checked.martes}
              onChange={handleChangeCheack}
            />
            <Typography style={{ width: 150 }}>Martes</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedTuesday}
                onChange={(date) =>
                  onChange({ name: "selectedTuesday", value: date })
                }
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedTuesdayEnd}
                onChange={(date) =>
                  onChange({ name: "selectedTuesdayEnd", value: date })
                }
              />
            </MuiPickersUtilsProvider>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              name="miercoles"
              checked={checked.miercoles}
              onChange={handleChangeCheack}
            />
            <Typography style={{ width: 150 }}>Miercoles</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedWednesday}
                onChange={(date) =>
                  onChange({ name: "selectedWednesday", value: date })
                }
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedWednesdayEnd}
                onChange={(date) =>
                  onChange({ name: "selectedWednesdayEnd", value: date })
                }
              />
            </MuiPickersUtilsProvider>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              name="jueves"
              checked={checked.jueves}
              onChange={handleChangeCheack}
            />
            <Typography style={{ width: 150 }}>Jueves</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedThursday}
                onChange={(date) =>
                  onChange({ name: "selectedThursday", value: date })
                }
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedThursdayEnd}
                onChange={(date) =>
                  onChange({ name: "selectedThursdayEnd", value: date })
                }
              />
            </MuiPickersUtilsProvider>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              name="viernes"
              checked={checked.viernes}
              onChange={handleChangeCheack}
            />
            <Typography style={{ width: 150 }}>Viernes</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedFriday}
                onChange={(date) =>
                  onChange({ name: "selectedFriday", value: date })
                }
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedFridayEnd}
                onChange={(date) =>
                  onChange({ name: "selectedFridayEnd", value: date })
                }
              />
            </MuiPickersUtilsProvider>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              name="sabado"
              checked={checked.sabado}
              onChange={handleChangeCheack}
            />
            <Typography style={{ width: 150 }}>Sabado</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedSaturday}
                onChange={(date) =>
                  onChange({ name: "selectedSaturday", value: date })
                }
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedSaturdayEnd}
                onChange={(date) =>
                  onChange({ name: "selectedSaturdayEnd", value: date })
                }
              />
            </MuiPickersUtilsProvider>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              name="domingo"
              checked={checked.domingo}
              onChange={handleChangeCheack}
            />
            <Typography style={{ width: 150 }}>Domingo</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedSunday}
                onChange={(date) =>
                  onChange({ name: "selectedSunday", value: date })
                }
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                className={classes.textField}
                value={state.selectedSundayEnd}
                onChange={(date) =>
                  onChange({ name: "selectedSundayEnd", value: date })
                }
              />
            </MuiPickersUtilsProvider>
          </div>
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
