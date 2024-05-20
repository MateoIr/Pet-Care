import { Link } from "react-router-dom";
import foot from "../../images/foot.jpg";
import CustomButton from "../../components/customButton/CustomButton";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import { Box, Grid, Typography } from "@mui/material";
import "./Login.css";
const Login = () => {
  return (
    <>
      <Box className="footLeft">
        <img src={foot} alt="foot image 1" />
      </Box>
      <Box className="footRight">
        <img src={foot} alt="foot image 2" />
      </Box>
      <Box className="dysplayContainer">
        <Box sx={{ width: 300, textAlign: "center" }}>
          <Typography className="titleLogin" sx={{ fontSize: "70px" }}>
            PET-CARE
          </Typography>
          <Box
            sx={{
              borderBottom: "1.4px solid #ffdfae",
              borderTop: "1.4px solid #ffdfae",
              marginTop: 6,
            }}
          >
            <Grid
              spacing={3}
              container
              sx={{
                textAlign: "left",
                marginY: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item xs={4}>
                <Typography className="text" sx={{ fontSize: "17px" }}>
                  Correo:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <CustomTextBox type="text" />
              </Grid>
              <Grid item xs={4}>
                <Typography className="text" sx={{ fontSize: "17px" }}>
                  Contraseña:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <CustomTextBox type="password" />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ paddingTop: 3, paddingBottom: 2 }}>
            <CustomButton text="Iniciar sesión" />
          </Box>
          <Link href="#" className="link">
            Olvidé mi contraseña
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;
