import {
    Box,
    Grid,
  } from "@mui/material";
import CustomButton from "../../components/customButton/CustomButton";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Stack from '@mui/material/Stack';

import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import useGetReportYearTurnos from '../../hooks/turn/useGetReportYearTurnos';
import useGetReportYearPedido from '../../hooks/turn/useGetReportYearPedido';
import './Style.css';
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
const GeneralReports = ({ setUser }) => {
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
  
    const onSubmit = (data) => {
      setFechaDesde(data.fechaDesde);
      setFechaHasta(data.fechaHasta);
    };
  
    const [chartData, setChartData] = useState({
      xAxis: [],
      series: [],
    });
  
    const { pedidos, isLoadingp, errorp } = useGetReportYearPedido();
    const { turnos, isLoadingt, errort } = useGetReportYearTurnos();
  
    const monthsInSpanish = [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
      ];

    useEffect(() => {
      // Log the data for debugging purposes
      console.log("Pedidos:", pedidos);
      console.log("Turnos:", turnos);
      
      if (pedidos && pedidos.length > 0 && turnos && turnos.length > 0) {
        const xAxisData = Array.from(new Set([...pedidos.map(item => item["mes:"]), ...turnos.map(item => item["mes:"])])); // Combine and deduplicate months
        /*const pedidosSeriesData = xAxisData.map((monthNumber) => {
            // Get corresponding data from pedidos and turnos, defaulting to 0 if not available
            const pedidosValue = pedidos.find(item => item["mes:"] === monthNumber)?.["total:$"] || 0;
            return {
              name: monthNumber, 
              pedidos: pedidosValue, 
            };
          });
          const turnosSeriesData = xAxisData.map((monthNumber) => {
            // Get corresponding data from pedidos and turnos, defaulting to 0 if not available
            const turnosValue = turnos.find(item => item["mes:"] === monthNumber)?.["total:$"] || 0;
            return {
              name: monthNumber, 
              turnos: turnosValue, 
            };
          });

          console.log(turnosSeriesData);
*/
       // const xAxisData = Array.from(new Set([...pedidos.map(item => item["mes:"]), ...turnos.map(item => item["mes:"])])); 
        const pedidosSeriesData = pedidos.map(item => item["total:$"]);
        const turnosSeriesData = turnos.map(item => item["total:$"]); 
  
        setChartData({
          xAxis: xAxisData,
          series: [
            {
              data: pedidosSeriesData,
              label: "Pedidos",
              color: "#42a5f5",
              
            },
            {
              data: turnosSeriesData,
              label: "Turnos",
              color: "#ff7043", 
            },
          ],
        });
      }
    }, [pedidos, turnos]); 
    const currencyFormatter = new Intl.NumberFormat('es-ar', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
      }).format;
    return (
      <Grid
        container
        sx={{
          textAlign: "center",
          height: "100vh",
          margintop:"10vh",
          alignItems: "start",
        }}
      >
        <Grid item xs={12} sm={10} sx={{ height: "90%" }}>
          <Grid container sx={{ alignItems: "start", width: { xs: "90%" } }} rowGap={2}>
            <Grid item xs={6} md={3} className="textInput">Fecha desde:</Grid>
            <Grid item xs={6} md={3}>
              <CustomTextBox type="date" register={register} name="fechaDesde" />
              <p className="errorText">{errors.fechaDesde?.message}</p>
            </Grid>
            <Grid item xs={6} md={3} className="textInput">Fecha hasta:</Grid>
            <Grid item xs={6} md={3}>
              <CustomTextBox type="date" register={register} name="fechaHasta" />
              <p className="errorText">{errors.fechaHasta?.message}</p>
            </Grid>
            <Grid item xs={9} md={3} sx={{ mb: 2 }}>
              <CustomButton onClick={handleSubmit(onSubmit)} text="Buscar" />
            </Grid>
          </Grid>
          <Box className="titlePage">Montos anuales de turnos y pedidos</Box>
          <Grid container spacing={2}>
            <Grid item xs={10} md={10}>
            <Stack
              direction="row"
              sx={{ width: '100%' }}
              className="custom-y-padding-bottom"
            ><Box sx={{ flexGrow: 1 }}>
              {isLoadingp || isLoadingt ? (
                <p>Cargando...</p>
              ) : errorp || errort ? (
                <p>Error al obtener los datos.</p>
              ) : chartData.xAxis.length === 0 || chartData.series.length === 0 ? (
                <p>No data to display</p>
              ) : (
                
                <LineChart
                    xAxis={[{ 
                        data: chartData.xAxis, 
                        label:"Mes",
                        valueFormatter:(monthNumber) => monthsInSpanish[monthNumber - 1] ,
                  
                    }]}
                    yAxis={[{ label: "Montos en $",
                        labelStyle:{transform:"translateX(-10px) !important;"}, 
                        position: 'outside',
                        labelAlign:"end",
                        valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
                        tickPlacement:'middle',
                    }]} 
                    series={ chartData.series.map((series) => ({
                        ...series,
                        valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
                      }))

                     } // Multiple series for both "pedidos" and "turnos"
                  
                    height={300}
                    padding={{ left: 30, right: 30, top: 30, bottom: 30 }}
                    margin={{left:150}}
                    grid={{ vertical: true, horizontal: true }}
                    skipAnimation={false}
                    scaletype={'band'}
                
                />
              )}
              </Box>
            </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  
  export default GeneralReports;
  