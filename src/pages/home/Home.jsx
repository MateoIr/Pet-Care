import { Box, Grid } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";

const Home = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        alignItems: "center",
        textAlign: "center",
        height: "100vh",
      }}
    >
      <Grid item xs={3} lg={2}>
        <Box>
          <CustomNavBar />
        </Box>
      </Grid>
      <Grid item xs={9} lg={10}>
        ejemplo de texto
      </Grid>
    </Grid>
  );
};

export default Home;
