import React from 'react'
import ReportsTurn from '../../reports/ReportsTurn'
import { Box, Grid } from '@mui/material'
import CustomNavBar from '../../../components/customNavBar/CustomNavBar'
import ReportsSells from '../../reports/ReportsSells'
import GeneralReports from '../../reports/GeneralReports'

export const ReportSection = ({setUser}) => {
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
        
        <Grid item xs={12} sm={10}>
          <Box className="titlePage" mb={4}>Reportes de turnos</Box>
          <Box sx={{ pl: 5, pr: 5, mb: 12 }}><ReportsTurn /></Box>
          
          <Box className="titlePage" mb={4}>Reportes de ventas/productos</Box>
          <Box sx={{ pl: 5, pr: 5, mt: 4, mb: 12 }}><ReportsSells /></Box>

          <Box className="titlePage" mb={4} mt={18}>Reportes generales</Box>
          <Box sx={{ pl: 5, pr: 5, mt: 6 }}><GeneralReports /></Box>
        </Grid>
      </Grid>


  )
}
