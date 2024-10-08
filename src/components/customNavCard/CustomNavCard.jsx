import { Box, Grid } from "@mui/material"
import CustomButton from "../customButton/CustomButton"
import { Link } from "react-router-dom"

export const CustomNavCard = ({ image, items, text }) => {
  return (
    <Grid 
      container 
      sx={{
        backgroundColor: "#ffdfae",
        width: "300px", 
        height: "360px",
        borderRadius: 3,
        border: "2px solid #805454",
        display: 'flex',
        justifyContent: 'center',  // Centra horizontalmente
        alignItems: 'start'       // Centra verticalmente
      }}
    >
      <Grid 
        item 
        xs={10} 
        sx={{
          height:"30%",
          backgroundColor: "#805454",
          display: 'flex',
          justifyContent: 'center',  // Centra el contenido dentro del item
          alignItems: 'center',       // Centra el contenido dentro del item
          mt:4              // Asegura que tome toda la altura disponible
        }}
      >
        <img 
        src={image} 
        alt="Descripción de la imagen" // Cambia esto según corresponda
        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} // Ajusta la imagen
      />
      </Grid>
      
      <Grid xs={8}>
      {items.map((item, index) => (
        
        <Link key={index} to={item.link}>
          <CustomButton text={item.name} />
        </Link>
        
      ))}
      </Grid>
      
       
      
    </Grid>
    

    
  )
}
