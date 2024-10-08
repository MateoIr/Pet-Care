
import React from 'react'
import { CustomNavCard } from '../../components/customNavCard/CustomNavCard'
import { Box, Grid } from '@mui/material'
import CustomNavBar from '../../components/customNavBar/CustomNavBar'
import foot from "../../images/foot.jpg";

export const ClientSection = (setUser) => {

  const items = [
    { name: 'Registrar Cliente', link: "/client/register" },
    { name: 'Lista de Clientes', link: '/client/clienteList' },
   
  ];

  const image = foot;

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

        <CustomNavCard image={image} items={items} text={"Cliente"}/>

        <CustomNavCard image={image} items={items} text={"Cliente"}/>

      </Grid>
      </Grid>
      </>
  )
}
