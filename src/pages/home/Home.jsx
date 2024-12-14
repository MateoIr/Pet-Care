import { Box, Grid } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomButton from "../../components/customButton/CustomButton";
import { Link } from "react-router-dom";
import foot from "../../images/foot.jpg";
import "./Home.css";
import * as React from "react";
import PropTypes from "prop-types";
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

const Home = ({ setUser }) => {
  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1); // Restamos un día a la fecha actual
  const fechaAyer = ayer.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  const { cupo } = useGetCupoDay(fechaAyer);

  const total = 35;

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
        console.warn("Turno sin fecha:", turno);
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

// Depuración: imprimir turnos procesados
console.log("Filtered Turnos:", filteredTurnos);

// Crear las filas para la tabla
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
    turno?.turno?.idmascota?.idcliente?.idpersona?.apellido,
  )
);

// Depuración: imprimir las filas generadas
console.log("Rows generados:", rows);

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
        <Grid container rowGap={2} className="listadoTurnos">            
          <Grid item md={10} rowGap={3} style={{marginTop: "4rem"}} >
          <Box className="titlePage">Cupos asignados en la Guardería: </Box>
          </Grid>
          <Grid item md={8} rowGap={3}>          
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <CircularProgress
          variant="determinate"
          value={(cupo / total) * 100}  // Calculamos el porcentaje
          size={200}
          thickness={5}
          sx={{
            color: '#FFDFAE',  // Color de la parte progresada
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
          style={{
            backgroundColor: '#e6e3de',  // Color de la parte no progresada (gris)
            borderRadius: '50%',  // Asegura que el fondo sea redondo
          }}
        />
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 16,
            fontWeight: 'bold',
            color: "#805454",
          }}
        >
          {cupo}/{total}
        </Typography>
          </Box>
          </Grid>
          <Grid item md={10} rowGap={3}>
            <TableContainer component={Paper} style={{color: "#805454"}}>
            <Box className="titlePage">Próximos turnos</Box>
                    <Table aria-label="collapsible table" >
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
                        {rows.map(row => (
                          <Row key={row.id} row={row} />
                        ))}
                      </TableBody>
                    </Table>
            </TableContainer>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
