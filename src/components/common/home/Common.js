import * as React from "react";
import "./Common.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
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
    height: 350,
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
  const theme = useTheme();
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
          <Paper className={classes.paper}>
            VENTAS SEMANALES EN MXN
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
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            VENTAS POR SUCURSAL
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
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            RESERVAS POR COLABORADOR
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
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            COLABORADORES
            <List
              sx={{
                width: "100%",
                height: "auto",
                bgcolor: "background.paper",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Luis Jimenez"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Online
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Mariana Perez"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Dando Servicio
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Sian Martinez"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Offline
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
