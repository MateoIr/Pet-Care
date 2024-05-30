import { Box, Grid } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomButton from "../../components/customButton/CustomButton";
import { Link } from "react-router-dom";
import { Margin, Padding } from "@mui/icons-material";

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
      <Grid
        item
        xs={12}
        sm={10}
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexFlow: "column",
          pt: 30,
        }}
      >
        <Box
          sx={{
            width: "200px",
            height: "100%",
          }}
        >
          <Grid container xs={{ height: "100%" }} rowSpacing={2}>
            <Grid item md={12} rowGap={3}>
              <Link to="/user/createUser">
                <CustomButton text="Crear usuario"></CustomButton>
              </Link>
            </Grid>
            <Grid item md={12}>
              <Link to="/client/pet/register">
                <CustomButton text="Registrar Mascota"></CustomButton>
              </Link>
            </Grid>
            <Grid item md={12}>
              <Link to="/user/userList">
                <CustomButton text="Lista de usuarios"></CustomButton>
              </Link>
            </Grid>
            <Grid item md={12}>
              <Link to="/client/register">
                <CustomButton text="Registrar Cliente"></CustomButton>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
