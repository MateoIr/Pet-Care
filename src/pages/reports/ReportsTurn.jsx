import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {
    Box,
    Grid,
  } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import CustomButton from "../../components/customButton/CustomButton";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import useGetContarTurnos from '../../hooks/turn/useGetContarTurnos';
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

const ReportsTurn = ({ setUser }) => {

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
  const { reporte, isLoading, error } = useGetContarTurnos(fechaDesde, fechaHasta);

  const onSubmit = (data) => {
    setFechaDesde(data.fechaDesde);
    setFechaHasta(data.fechaHasta);
  };

  // Transformar los datos de la API para el gráfico de torta
  const turnos = reporte
  ? [
      { name: "Guardería", value: reporte.TipoTurnoGuarderia , color:"#B800D8", monto: reporte.MontoGuarderia},
      { name: "Peluquería", value: reporte.TipoTurnoPeluqueria , color:"#72CCFF", monto: reporte.MontoPeluqueria},
      //{ name: "Paseo", value: reporte.TipoTurnoPaseo },
      { name: "Veterinaria", value: reporte.TipoTurnoVeterinario ,color:"#02B2AF", monto: reporte.MontoVeterinaria},
    ]
  : [];

  // Función para calcular el porcentaje total
  const totalValue = turnos.reduce((acc, curr) => acc + curr.value, 0);

  // Normalizar los valores a porcentajes
  const normalizedTurnos = turnos.map((turno) => ({
    label: turno.name,
    value: totalValue ? (turno.value / totalValue) * 100 : 0,
    color: turno.color,
    numero:turno.value,
    monto:turno.monto,
  }));

  const valueFormatterPercentage = (item) => `${item.value.toFixed(2)}%`;



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
        <Box className="titlePage">Porcentajes de tipos de turnos</Box>
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
                  data: turnos,
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
          
            <h4>Turnos</h4>
            {normalizedTurnos.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: 16, height: 16, backgroundColor: item.color || 'gray', marginRight: 4
                }} />
                {item.label}: {valueFormatterPercentage(item)} ({item.numero})
              </div>
            ))}
        </Grid>
        </Grid>
      <Box className="titlePage">Montos por tipos de turnos</Box>
      <BarChart
        xAxis={[{ scaleType: 'band', data: normalizedTurnos.map(item => item.label) }]}
        series={[
          {
            data: normalizedTurnos.map(item => item.monto),
            color: normalizedTurnos.map(item => item.color), // Puedes ajustar los colores según corresponda
          },
        ]}
        width={500}
        height={300}
      />

      </Grid>
    </Grid>
    
  );
}

export default ReportsTurn;
