import { Box, Grid } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomButton from "../../components/customButton/CustomButton";
import "./Home.css";
import * as React from "react";
import "./Style.css";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useGetDaycareServices from "../../hooks/turn/useGetDaycareServices"; // Hook para obtener los eventos
import useGetCupoDay from "../../hooks/turn/useGetCupoDat";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import { useForm } from "react-hook-form";
import useGetContarTurnosPorRango from "../../hooks/turn/useGetContarTurnosPorRango";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const yesterdayFormatted = yesterday.toISOString().split("T")[0]; // Formato YYYY-MM-DD

const weekMore = new Date(); // Crear una nueva instancia de Date para hace un mes
weekMore.setDate(today.getDate() + 7);
const weekMoreFormatted = weekMore.toISOString().split("T")[0];

const schema = yup.object().shape({
  fechaDesde: yup.date().required("La fecha desde es requerida"),
  fechaHasta: yup
    .date()
    .required("La fecha hasta es requerida")
    .test(
      "is-greater",
      "La fecha de fin debe ser posterior a la de inicio",
      function (value) {
        const { fechaDesde } = this.parent;
        return value > fechaDesde;
      }
    ),
});

const Home = ({ setUser }) => {
  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1); // Restamos un día a la fecha actual
  const fechaAyer = ayer.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  const { cupo } = useGetCupoDay(fechaAyer);

  const total = 35;

  const [fechaDesde, setFechaDesde] = useState(yesterdayFormatted);
  const [fechaHasta, setFechaHasta] = useState(weekMoreFormatted);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fechaDesde: yesterdayFormatted,
      fechaHasta: weekMoreFormatted,
    },
  });

  const [chartData, setChartData] = useState({
    xAxis: [],
    series: [],
  });

  const { reporte, isLoadingt, errort } = useGetContarTurnosPorRango(
    fechaDesde,
    fechaHasta
  );

  const onSubmit = (data) => {
    setFechaDesde(data.fechaDesde);
    setFechaHasta(data.fechaHasta);
  };

  useEffect(() => {
    if (reporte && Object.keys(reporte).length > 0) {
      const xAxisData = Object.keys(reporte).map(
        (dateStr) => new Date(dateStr)
      );
      const reporteSeriesData = Object.values(reporte);
      //console.log("xaxisdata",xAxisData);
      // Solo actualizar chartData si realmente ha cambiado
      setChartData((prevData) => {
        // Si el chartData no ha cambiado, no actualizar el estado
        if (
          JSON.stringify(prevData.xAxis) !== JSON.stringify(xAxisData) ||
          JSON.stringify(prevData.series) !==
            JSON.stringify([
              {
                data: reporteSeriesData,
                label: "Ocupación de guardería por día",
                color: "#ff7043",
              },
            ])
        ) {
          return {
            xAxis: xAxisData,
            series: [
              {
                data: reporteSeriesData,
                label: "Ocupación de guardería por día",
                color: "#ff7043",
              },
            ],
          };
        }
        return prevData; // No cambiar el estado si no ha habido cambios
      });
    }
  }, [reporte]); // Solo se ejecutará cuando 'reporte' cambie

  function createTurnoData(
    id,
    fechaTurno,
    nombreMascota,
    tipoTurno,
    estado,
    horarioDesde,
    horarioHasta,
    costoTotal,
    nombreCliente,
    apellidoCliente
  ) {
    return {
      id,
      fechaTurno,
      nombreMascota,
      tipoTurno,
      estado,
      horarioDesde,
      horarioHasta,
      costoTotal,
      nombreCliente,
      apellidoCliente,
    };
  }

  function Row({ row }) {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.nombreMascota}</TableCell>
          <TableCell>{row.tipoTurno}</TableCell>
          <TableCell>{row.fechaTurno}</TableCell>
          <TableCell>{`${row.horarioDesde}`}</TableCell>
          <TableCell align="right">${row.costoTotal}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Estado del turno: {row.estado}
                </Typography>
                <Typography variant="body2">
                  Cliente: {row.nombreCliente} {row.apellidoCliente}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const { turnos, isLoading, error } = useGetDaycareServices();

  if (isLoading) {
    return (
      <Grid
        container
        sx={{
          width: "100%",
          alignItems: "start",
          textAlign: "center",
          height: "100vh",
        }}
      >
        <Grid item xs={12} sm={2}>
          <Box>
            <CustomNavBar setUser={setUser} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={10} className="homeContainer">
          Cargando...
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid
        container
        sx={{
          width: "100%",
          alignItems: "start",
          textAlign: "center",
          height: "100vh",
        }}
      >
        <Grid item xs={12} sm={2}>
          <Box>
            <CustomNavBar setUser={setUser} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={10} className="homeContainer">
          Error al cargar los turnos: {error.message}, intente nuevamente más
          tarde
        </Grid>
      </Grid>
    );
  }

  const formatFecha = (fecha) => {
    const [year, month, day] = fecha.split("-");
    return `${day}-${month}-${year}`;
  };

  const parseFechaToDate = (fecha) => {
    const [year, month, day] = fecha.split("-");
    return new Date(year, month - 1, day); // Los meses son indexados desde 0 en JavaScript
  };

  // Obtener la fecha de hoy
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const filteredTurnos = turnos
    .map((turno) => {
      try {
        // Validar que el campo `fechaturno` exista
        if (!turno?.turno?.fechaturno) {
          //console.warn("Turno sin fecha:", turno);
          return null; // Ignorar este turno
        }

        // Formatear y parsear la fecha
        const formattedFecha = formatFecha(turno.turno.fechaturno);
        const parsedFecha = parseFechaToDate(turno.turno.fechaturno);

        // Validar que la fecha parseada sea válida
        if (isNaN(parsedFecha)) {
          console.warn("Fecha inválida en turno:", turno.turno.fechaturno);
          return null;
        }

        return {
          ...turno,
          formattedFecha,
          parsedFecha,
        };
      } catch (error) {
        console.error("Error procesando turno:", turno, error);
        return null;
      }
    })
    .filter((turno) => turno !== null && turno.parsedFecha >= yesterday) // Filtrar nulos y turnos pasados
    .sort((a, b) => a.parsedFecha - b.parsedFecha) // Ordenar por fecha
    .slice(0, 5); // Tomar los primeros 5 turnos

  const rows = filteredTurnos.map((turno) =>
    createTurnoData(
      turno?.turno?.id,
      turno?.formattedFecha,
      turno?.turno?.idmascota?.nombre,
      turno?.turno?.idtipoTurno?.nombreTurno,
      turno?.turno?.idestado?.descripcion,
      turno?.turno?.horarioturnodesde,
      turno?.turno?.horarioturnohasta,
      turno?.turno?.costototal,
      turno?.turno?.idmascota?.idcliente?.idpersona?.nombre,
      turno?.turno?.idmascota?.idcliente?.idpersona?.apellido
    )
  );

  const numberFormatter = new Intl.NumberFormat().format;
  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          alignItems: "start",
          textAlign: "center",
          height: "100vh",
        }}
      >
        <Grid item xs={12} sm={2}>
          <Box>
            <CustomNavBar setUser={setUser} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={10} className="homeContainer">
          <Grid container rowGap={3} className="listadoTurnos">
            <Grid item md={12} sm={12} rowGap={3} style={{ marginTop: "1rem" }}>
              <Box className="titlePage">
                Cupos asignados actualmente en la guardería:{" "}
              </Box>
            </Grid>
            <Grid item md={8} rowGap={3}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <CircularProgress
                  variant="determinate"
                  value={(cupo / total) * 100} // Calculamos el porcentaje
                  size={200}
                  thickness={5}
                  sx={{
                    color: "#FFDFAE", // Color de la parte progresada
                    "& .MuiCircularProgress-circle": {
                      strokeLinecap: "round",
                    },
                  }}
                  style={{
                    backgroundColor: "#e6e3de", // Color de la parte no progresada (gris)
                    borderRadius: "50%", // Asegura que el fondo sea redondo
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#805454",
                  }}
                >
                  {cupo}/{total}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={10} rowGap={3}>
              <TableContainer component={Paper} style={{ color: "#805454" }}>
                <Box className="titlePage">Próximos turnos</Box>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Mascota</TableCell>
                      <TableCell>Tipo de Turno</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Horario</TableCell>
                      <TableCell align="right">Costo Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <Row key={row.id} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={10} rowGap={3} style={{ marginTop: "2rem" }}>
              <Box className="titlePage">
                Asignación de cupos en la guardería:{" "}
              </Box>

              <Grid container rowGap={3}>
                <Grid item xs={4} md={2} className="textInput">
                  Fecha desde:
                </Grid>
                <Grid item xs={4} md={2}>
                  <CustomTextBox
                    type="date"
                    register={register}
                    name="fechaDesde"
                  />
                  <p className="errorText">{errors.fechaDesde?.message}</p>
                </Grid>
                <Grid item xs={4} md={2} className="textInput">
                  Fecha hasta:
                </Grid>
                <Grid item xs={4} md={2}>
                  <CustomTextBox
                    type="date"
                    register={register}
                    name="fechaHasta"
                  />
                  <p className="errorText">{errors.fechaHasta?.message}</p>
                </Grid>
                <Grid item xs={10} md={5} sx={{ mb: 2, ml: 2 }}>
                  <CustomButton
                    onClick={handleSubmit(onSubmit)}
                    text="Buscar"
                  />
                </Grid>
              </Grid>
              <Grid item md={10} rowGap={3}>
                <Stack
                  direction="row"
                  sx={{ width: "100%" }}
                  className="custom-y-padding-bottom"
                >
                  <Box sx={{ flexGrow: 1 }}>
                    {isLoadingt ? (
                      <p>Cargando...</p>
                    ) : errort ? (
                      <p>Error al obtener los datos.</p>
                    ) : chartData.xAxis.length === 0 ||
                      chartData.series.length === 0 ? (
                      <p>No data to display</p>
                    ) : (
                      <LineChart
                        xAxis={[
                          {
                            data: chartData.xAxis,
                            label: "Día",
                            dataKey: "date",
                            scaleType: "point",
                            valueFormatter: (date) =>
                              date.getDate().toString() +
                              "-" +
                              (date.getMonth() + 1).toString(),
                          },
                        ]}
                        yAxis={[
                          {
                            label: "Cupos asignados",
                            valueFormatter: (v) =>
                              v === null ? "" : numberFormatter(v),
                          },
                        ]}
                        series={chartData.series.map((series) => ({
                          ...series,
                          valueFormatter: (v) =>
                            v === null ? "" : numberFormatter(v),
                        }))}
                        height={300}
                        padding={{ left: 30, right: 30, top: 30, bottom: 30 }}
                        margin={{ left: 150 }}
                      />
                    )}
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
