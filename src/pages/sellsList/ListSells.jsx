import { Box, Grid } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomButton from "../../components/customButton/CustomButton";
import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useGetVentasByDate from "../../hooks/produts/useGetVentasByDate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from 'yup';
import CustomTextBox from "../../components/customTextBox/CustomTextBox";


// Calcular la fecha de hoy y la fecha de hace un mes
const today = new Date();
today.setDate(today.getDate()+1);
const todayFormatted = today.toISOString().split('T')[0];
//const yesterday = new Date();
//yesterday.setDate(today.getDate() - 1);
//const yesterdayFormatted = yesterday.toISOString().split('T')[0]; // Formato YYYY-MM-DD

const lastMonth = new Date(); // Crear una nueva instancia de Date para hace un mes
lastMonth.setMonth(lastMonth.getMonth() - 2);
lastMonth.setDate(lastMonth.getDate()-1);
const lastMonthFormatted = lastMonth.toISOString().split('T')[0];

const schema = yup.object().shape({
  fechaDesde: yup.date().required('La fecha desde es requerida'),
  fechaHasta: yup.date().required('La fecha hasta es requerida'),
});

const ListSells = ({ setUser }) => {
    const [fechaDesde, setFechaDesde] = useState(lastMonthFormatted);
  const [fechaHasta, setFechaHasta] = useState(todayFormatted);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fechaDesde: lastMonthFormatted,
      fechaHasta: todayFormatted,
    },
  });
  // Llamada al hook para obtener el reporte
  const { ventas, isLoading, error } = useGetVentasByDate(fechaDesde, fechaHasta);

  const onSubmit = (data) => {
    setFechaDesde(data.fechaDesde);
    setFechaHasta(data.fechaHasta);
  };
  
  
  
  function createPedidosData(id, fechaPedido, descripcion, formaDePago, nombreCliente, apellidoCliente, productos) {
    return {
        id,
        fechaPedido,
        descripcion,
        formaDePago,
        nombreCliente,
        apellidoCliente,
        productos, // Productos ahora es un array
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
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nombreCliente} {row.apellidoCliente}</TableCell>
                <TableCell>{row.fechaPedido}</TableCell>
                <TableCell>{row.formaDePago}</TableCell>
                <TableCell>{row.descripcion}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detalle del pedido
                            </Typography>
                            {/* Iterar sobre cada producto en el array */}
                            {row.productos.map((producto, index) => (
                                <Typography key={index} variant="body2">
                                    {`Producto: ${producto.producto}, Unidades: ${producto.unidades}`}
                                </Typography>
                            ))}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
  
  
  
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
  )
}

if (error) {
  return(    
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
      Error al cargar los pedidos: {error.message}, intente nuevamente más tarde
      </Grid>
    </Grid>
  )
}
  
  // Crear los datos de las filas para la tabla
  const rows = ventas.map((pedido) =>
    createPedidosData(
        pedido.id,
        pedido.fechaPedido,
        pedido.descripcion,
        pedido.formaDePago,
        pedido.nombreCliente,
        pedido.apellidoCliente,
        pedido.productos // Pasar productos como array
    )
).sort((a, b) => new Date(b.fechaPedido) - new Date(a.fechaPedido)); // Ordenar por fecha (de más reciente a más antiguo)

     
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
          <Grid item xs={12} sm={10} >  

          <Grid
            container
            sx={{
            alignItems: "start",
            width: { xs: "90%" },
            mt: 4,
            ml:4,
            }}
            rowGap={2}
            >
            <Grid item xs={12} sm={6} md={3}  className="textInput">
                Fecha desde:
            </Grid>
            <Grid xs={12} sm={6} md={3} >
            <CustomTextBox type="date" register={register} name="fechaDesde" />
            <p className="errorText">{errors.fechaDesde?.message}</p>
            </Grid>
            <Grid item xs={12} sm={6} md={3}  className="textInput">
                Fecha hasta:
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
            <CustomTextBox type="date" register={register} name="fechaHasta" />
            <p className="errorText">{errors.fechaHasta?.message}</p>
            </Grid>
            <Grid item xs={12} sm={9} md={3} sx={{ mb: 2 }}>
                <CustomButton
                onClick={handleSubmit(onSubmit)}
                text="Buscar"
                //isLoading={isLoading}
                />
            
            </Grid>
              <TableContainer 
              component={Paper}
              sx={{ color: "#805454", overflowX: "auto" }} >
              <Box className="titlePage">Ventas realizadas</Box>
                      <Table aria-label="collapsible table" >
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell>ID Pedido</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Fecha de pedido</TableCell>
                            <TableCell>Forma de pago</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell align="right">..</TableCell>
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
        
     
    );
  };
  
  export default ListSells;
  