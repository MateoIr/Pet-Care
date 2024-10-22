import React from 'react'
import ReportsTurn from '../../reports/ReportsTurn'
import { Box, Grid } from '@mui/material'
import CustomNavBar from '../../../components/customNavBar/CustomNavBar'

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
          <Box className="titlePage">Reportes</Box>
          <Box sx={{pl:5,pr:5}}><ReportsTurn/></Box>
          </Grid>
      </Grid>


  )
}
