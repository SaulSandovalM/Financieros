import React from "react";
// import "./Common.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined),
];

const dataPie = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const dataBar = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  paperChart: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  chart: {
    height: 300,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
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

  const theme = useTheme();

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
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            VENTAS SEMANALES EN MXN
            <Box style={{ marginTop: 10 }}>
              <Typography>
                <b>Corte de pelo</b>
              </Typography>
              <LinearProgress />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <Typography>
                <b>Corte de pelo</b>
              </Typography>
              <LinearProgress />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <Typography>
                <b>Corte de pelo</b>
              </Typography>
              <LinearProgress />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <Typography>Corte de pelo</Typography>
              <LinearProgress />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <Typography>
                <b>Corte de pelo</b>
              </Typography>
              <LinearProgress />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            VENTAS POR SUCURSAL
            <Box style={{ marginTop: 10 }}>
              <Typography>
                <b>Nombre colaborador</b>
              </Typography>
              <LinearProgress />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <Typography>
                <b>Nombre colaborador</b>
              </Typography>
              <LinearProgress />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <Typography>
                <b>Nombre colaborador</b>
              </Typography>
              <LinearProgress />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <Typography>Nombre colaborador</Typography>
              <LinearProgress />
            </Box>
            <Box style={{ marginTop: 10 }}>
              <Typography>
                <b>Nombre colaborador</b>
              </Typography>
              <LinearProgress />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            RESERVAS POR COLABORADOR
            <div className={classes.chart}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width="100%" height="100%">
                  <Pie
                    data={dataPie}
                    cx={80}
                    cy={120}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            COLABORADORES
            <div className={classes.chart}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={dataBar}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                  <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            VENTAS SEMANALES EN MXN
            <div className={classes.chart}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width="100%"
                  height="100%"
                  data={data}
                  margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                  }}
                >
                  <XAxis
                    dataKey="time"
                    stroke={theme.palette.text.secondary}
                    style={theme.typography.body2}
                  />
                  <YAxis
                    stroke={theme.palette.text.secondary}
                    style={theme.typography.body2}
                  >
                    <Label
                      angle={270}
                      position="left"
                      style={{
                        textAnchor: "middle",
                        fill: theme.palette.text.primary,
                        ...theme.typography.body1,
                      }}
                    >
                      Sales ($)
                    </Label>
                  </YAxis>
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="amount"
                    stroke={theme.palette.primary.main}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            VENTAS POR DIA
            <div className={classes.chart}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={dataBar}>
                  <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
