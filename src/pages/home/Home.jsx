import { Box, Grid } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";

const Home = ({ setUser }) => {
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
        ejemplo de texto
      </Grid>
    </Grid>
  );
};

export default Home;
