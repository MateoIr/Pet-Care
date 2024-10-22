import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import {
    Box,
    Grid,
  } from "@mui/material";

  import { BarChart } from '@mui/x-charts/BarChart';
// Datos derivados de https://gs.statcounter.com/os-market-share/desktop/worldwide/2023
// Y https://gs.statcounter.com/os-market-share/mobile/worldwide/2023
// Y https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide/2023
// Para el mes de diciembre de 2023
const ReportsTurn = ({ setUser }) => {

const desktopOS = [
  {
    label: 'Windows',
    value: 72.72,
  },
  {
    label: 'OS X',
    value: 16.38,
  },
  {
    label: 'Linux',
    value: 3.83,
  },
  {
    label: 'Chrome OS',
    value: 2.42,
  },
  {
    label: 'Other',
    value: 4.65,
  },
];

const mobileOS = [
  {
    label: 'Android',
    value: 70.48,
  },
  {
    label: 'iOS',
    value: 28.8,
  },
  {
    label: 'Other',
    value: 0.71,
  },
];

const platforms = [
  {
    label: 'Mobile',
    value: 59.12,
  },
  {
    label: 'Desktop',
    value: 40.88,
  },
];

const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2));

const mobileAndDesktopOS = [
  ...mobileOS.map((v) => ({
    ...v,
    label: v.label === 'Other' ? 'Other (Mobile)' : v.label,
    value: normalize(v.value, platforms[0].value),
  })),
  ...desktopOS.map((v) => ({
    ...v,
    label: v.label === 'Other' ? 'Other (Desktop)' : v.label,
    value: normalize(v.value, platforms[1].value),
  })),
];

const valueFormatterPercentage = (item) => `${item.value}%`;

const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: 'Jan',
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: 'Feb',
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: 'Mar',
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
      seoul: 73,
      month: 'Apr',
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      seoul: 99,
      month: 'May',
    },
    {
      london: 60,
      paris: 63,
      newYork: 103,
      seoul: 144,
      month: 'June',
    },
    {
      london: 59,
      paris: 60,
      newYork: 105,
      seoul: 319,
      month: 'July',
    },
    {
      london: 65,
      paris: 60,
      newYork: 106,
      seoul: 249,
      month: 'Aug',
    },
    {
      london: 51,
      paris: 51,
      newYork: 95,
      seoul: 131,
      month: 'Sept',
    },
    {
      london: 60,
      paris: 65,
      newYork: 97,
      seoul: 55,
      month: 'Oct',
    },
    {
      london: 67,
      paris: 64,
      newYork: 76,
      seoul: 48,
      month: 'Nov',
    },
    {
      london: 61,
      paris: 70,
      newYork: 103,
      seoul: 25,
      month: 'Dec',
    },
  ];
  
  // Función para formatear los valores
  const valueFormatterMM = (value) => `${value}mm`;
  
  // Configuración del gráfico
  const chartSettingBar = {
    xAxis: [
      {
        label: 'rainfall (mm)',
      },
    ],
    width: 500,
    height: 400,
  };

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
        <Box className="titlePage">Reportes / Porcentajes de tipos de turnos</Box>
        <PieChart
      series={[
        {
          data: desktopOS,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatterPercentage,
        },
      ]}
      height={200}
    />    
    <Box className="titlePage">Reportes / Barra de cantidad de estadías</Box>
    <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter: valueFormatterMM }]}
        layout="horizontal"
        {...chartSettingBar}
      />

      </Grid>
    </Grid>
    
  );
}

export default ReportsTurn;
