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
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const schema = yup.object().shape({
  anio: yup.date().required('El año es requerido'),
});
const GeneralReports = ({ setUser }) => {
    const currentYear = dayjs().year(); // Año actual
    const [anio, setAnio] = useState(currentYear);
  
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        anio: currentYear,
      },
    });
  
    

    const [chartData, setChartData] = useState({
      xAxis: [],
      series: [],
    });
  
    const { turnos, isLoadingt, errort, refetch: refetchTurnos } = useGetReportYearTurnos(anio);
    const { pedidos, isLoadingp, errorp, refetch: refetchPedidos } = useGetReportYearPedido(anio);
  
    const onSubmit = (data) => {
      const selectedYear = dayjs(data.anio).year(); // Extrae el año
      setAnio(selectedYear);
  
      // Refetch data
      refetchTurnos(); // Consulta de turnos
      refetchPedidos(); // Consulta de pedidos
  
      console.log({ anio: selectedYear });
    };
    const monthsInSpanish = [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
      ];


    useEffect(() => {
      // Log the data for debugging purposes
      //console.log("Pedidos:", pedidos);
      //console.log("Turnos:", turnos);
      
      if (pedidos && pedidos.length > 0 && turnos && turnos.length > 0) {
        const xAxisData = Array.from(new Set([...pedidos.map(item => item["mes:"]), ...turnos.map(item => item["mes:"])])); // Combine and deduplicate months
        const pedidosSeriesData = pedidos.map(item => item["total:$"]);
        const turnosSeriesData = turnos.map(item => item["total:$"]); 
  
        setChartData({
          xAxis: xAxisData,
          series: [
            {
              data: pedidosSeriesData,
              label: "Productos",
              color: "#42a5f5",
              
            },
            {
              data: turnosSeriesData,
              label: "Servicios",
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
          
          alignItems: "start",
        }}
      >
        <Grid item xs={12} sm={10} sx={{ height: "90%" }}>
          <Grid container sx={{ alignItems: "start", width: { xs: "90%" } }} rowGap={2}>
            <Grid item xs={4} md={2} className="textInput">Año:</Grid>
            <Grid item xs={8} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={dayjs()}
                openTo="year"
                views={['year']}
                yearsOrder="desc"
                value={dayjs(`${anio}`)} // Muestra el año seleccionado
                onChange={(newValue) => {
                  setValue("anio", newValue, { shouldValidate: true });
                  handleSubmit(onSubmit)(); // Ejecuta el submit inmediatamente
                }}
                
                renderInput={(params) => (
                  <input
                    {...register("anio")}
                    {...params}
                    type="text"
                    placeholder="Selecciona un año"
                    className={errors.anio ? "error-input" : ""}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={9} md={3} sx={{ mb: 2 }}>
            <CustomButton onClick={handleSubmit(onSubmit)} text="Buscar" />
          </Grid>
          </Grid>
          <Box className="titlePage">Montos anuales de servicios y productos</Box>
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
  