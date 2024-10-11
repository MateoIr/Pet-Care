import React from 'react'
import Calendar from '../../turnRegister/Calendar'
import { Box, Grid } from '@mui/material'
import CustomNavBar from '../../../components/customNavBar/CustomNavBar'

export const CalendarSection = ({setUser}) => {
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
          <Box className="titlePage">Calendario</Box>
          <Box sx={{pl:5,pr:5}}><Calendar/></Box>
          </Grid>
      </Grid>


  )
}
