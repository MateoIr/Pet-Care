import { Box, Grid } from "@mui/material";
import CustomButton from "../customButton/CustomButton";
import { Link } from "react-router-dom";

export const CustomNavCard = ({ image, items, text }) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#ffdfae",
        width: "270px",
        height: "310px",
        borderRadius: 3,
        border: "2px solid #805454",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Grid
        item
        sx={{
          width: "210px",
          height: "130px",

          mt: 4, // Asegura que tome toda la altura disponible
        }}
      >
        <Box sx={{ height: "110px", width: "210px" }}>
          <img
            src={image}
            alt="Descripción de la imagen" // Cambia esto según corresponda
            style={{
              backgroundColor: "red",
              maxHeight: "110px",
              maxWidth: "100%",
              objectFit: "contain",
            }} // Ajusta la imagen
          />
        </Box>
        <Box sx={{ height: "20px", width: "100%", fontSize: "24px" }}>
          {text}
        </Box>
      </Grid>

      {items.map((item, index) => (
        <Grid xs={9} key={index}>
          <Link key={index} to={item.link}>
            <CustomButton text={item.name} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
