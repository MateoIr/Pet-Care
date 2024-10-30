import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {
    Box,
    Grid,
  } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import CustomButton from "../../components/customButton/CustomButton";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import useGetProductoMasVendido from '../../hooks/produts/useGetProductoMasVendido';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useEffect } from 'react';
import { useState } from "react";



// Calcular la fecha de hoy y la fecha de hace un mes
const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const yesterdayFormatted = yesterday.toISOString().split('T')[0]; // Formato YYYY-MM-DD

const lastMonth = new Date(); // Crear una nueva instancia de Date para hace un mes
lastMonth.setMonth(lastMonth.getMonth() - 1);
lastMonth.setDate(lastMonth.getDate()-1);
const lastMonthFormatted = lastMonth.toISOString().split('T')[0];

const schema = yup.object().shape({
  fechaDesde: yup.date().required('La fecha desde es requerida'),
  fechaHasta: yup.date().required('La fecha hasta es requerida'),
});

const ReportsSells = ({ setUser }) => {

  const [fechaDesde, setFechaDesde] = useState(lastMonthFormatted);
  const [fechaHasta, setFechaHasta] = useState(yesterdayFormatted);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fechaDesde: lastMonthFormatted,
      fechaHasta: yesterdayFormatted,
    },
  });

  // Llamada al hook para obtener el reporte
  const { masVendidos, isLoading, error } = useGetProductoMasVendido(fechaDesde, fechaHasta);

  const onSubmit = (data) => {
    setFechaDesde(data.fechaDesde);
    setFechaHasta(data.fechaHasta);
  };

  // Transformar los datos de la API para el gráfico de torta
  // Opcional: definir colores para cada producto
const colors = ["#B800D8", "#72CCFF", "#02B2AF", "#FFDD44", "#FF5A5F"];

// Transforma el HashMap en el array de objetos que necesita el gráfico
const productos = masVendidos
  ? Object.keys(masVendidos).map((key, index) => ({
      name: key,
      value: masVendidos[key],
      color: colors[index % colors.length], // Usamos colores de forma cíclica
    }))
  : [];

  const valueFormatterPercentage = (item) => `${item.value.toFixed(2)}%`;
// Función para calcular el valor total
const totalValue = productos.reduce((acc, curr) => acc + curr.value, 0);

// Normalizar valores a porcentaje
const normalizedProductos = productos.map((producto) => ({
  label: producto.name,
  value: totalValue ? (producto.value / totalValue) * 100 : 0,
  color: producto.color,
  numero: producto.value,
  
}));



  return (
    <Grid
      container
      sx={{
        textAlign: "center",
        height: "100vh",
        alignItems: "start",
      }}
    >
      
      <Grid
        item
        xs={12}
        sm={10}
        sx={{
          height: "90%",
        }}
      >
        <Grid
        container
        sx={{
          alignItems: "start",
          width: { xs: "90%" },
        }}
        rowGap={2}
        >
        <Grid item xs={6} md={3} className="textInput">
          Fecha desde:
        </Grid>
        <Grid item xs={6} md={3}>
        <CustomTextBox type="date" register={register} name="fechaDesde" />
        <p className="errorText">{errors.fechaDesde?.message}</p>
        </Grid>
          <Grid item xs={6} md={3} className="textInput">
            Fecha hasta:
          </Grid>
          <Grid item xs={6} md={3}>
          <CustomTextBox type="date" register={register} name="fechaHasta" />
          <p className="errorText">{errors.fechaHasta?.message}</p>
        </Grid>
          <Grid item xs={9} md={3} sx={{ mb: 2 }}>
            <CustomButton
              onClick={handleSubmit(onSubmit)}
              text="Buscar"
              //isLoading={isLoading}
            />
          </Grid>
        </Grid>
        <Box className="titlePage">Porcentajes de productos mas vendidos</Box>
        <Grid container spacing={2}>
        <Grid item xs={8}>
          {/* Mostrar el gráfico de torta si hay datos */}
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error al obtener los datos.</p>
          ) : (
            <PieChart
              series={[
                {
                  data: productos,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  valueFormatterPercentage, // Mostrar como porcentaje
                },
              ]}
              height={200}
            />
          )}
        </Grid>

        <Grid item xs={4}>
          {/* Leyenda para el gráfico */}
          
            <h4>Productos</h4>
            {normalizedProductos.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: 16, height: 16, backgroundColor: item.color || 'gray', marginRight: 4
                }} />
                {item.label}: {valueFormatterPercentage(item)} ({item.numero})
              </div>
            ))}
        </Grid>
        </Grid>
        
      
      </Grid>
    </Grid>
    
  );
}

export default ReportsSells;
