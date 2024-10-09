import { Box, Grid } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomButton from "../../components/customButton/CustomButton";
import { Link } from "react-router-dom";
import foot from "../../images/foot.jpg";
import "./Home.css";

const Home = ({ setUser }) => {
  return (
    <>
      <Box className="footRigthHome1">
        <img src={foot} alt="foot image 1" />
      </Box>
      <Box className="footRigthHome2">
        <img src={foot} alt="foot image 2" />
      </Box>
      <Box className="footRigthHome3">
        <img src={foot} alt="foot image 3" />
      </Box>
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
          <Box
            sx={{
              width: "200px",
              height: "100%",
            }}
          >
            <Grid container rowSpacing={2}>
              <Grid item md={12} rowGap={3}>
                <Link to="/product/sell">
                  <CustomButton text="Registrar venta"></CustomButton>
                </Link>
              </Grid>
              <Grid item md={12} rowGap={3}>
                <Link to="/signature">
                  <CustomButton text="Registrar Firma"></CustomButton>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
