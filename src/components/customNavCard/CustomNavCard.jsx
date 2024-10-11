import { Box, Grid } from "@mui/material";
import CustomButton from "../customButton/CustomButton";
import { Link } from "react-router-dom";

export const CustomNavCard = ({ image, items, text }) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#ffdfae",
        width: "300px",
        height: "380px",
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
    width: "320px",
    height: "150px",
    mt: 1,
  }}
>
  <Box sx={{ height: "130px", width: "320px" }}>
    <img
      src={image}
      alt="Descripción de la imagen"
      style={{
        borderRadius: "7px",
        backgroundColor: "red",
        border: "2px solid #805454",
        height: "100%", // Cambiado a "100%" para ocupar toda la altura
         // Asegúrate de que ocupe todo el ancho
        objectFit: "contain", // Ajusta la imagen sin distorsionar
      }}
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
