import { Box, Grid } from "@mui/material";
import CustomNavBar from "../../../components/customNavBar/CustomNavBar";
import { CustomNavCard } from "../../../components/customNavCard/CustomNavCard";
import veterinariosImg from "../../../images/veterinarios.png";
import turnoImg from "../../../images/turnos.png";
import foot from "../../../images/foot.jpg";

import "./ConfigurationSection.css";

const ConfigurationSection = ({ setUser }) => {
  const turnos = [{ name: "Turnos", link: "/" }];

  const veterinarios = [
    { name: "Reg. Veterinario", link: "/veterinario/register" },
    { name: "Lista Veterinarios", link: "/veterinarians" },
    { name: "Registrar Clinica", link: "/veterinario/clinica/register" },
    { name: "Lista de Clinicas", link: "/clinics" },
  ];

  return (
    <>
      <Box className="foot6">
        <img src={foot} alt="foot image 3" />
      </Box>
      <Box className={`foot1 invisible`}>
        <img src={foot} alt="foot image 1" />
      </Box>
      <Box className="foot2">
        <img src={foot} alt="foot image 2" />
      </Box>
      <Box className="foot3">
        <img src={foot} alt="foot image 3" />
      </Box>
      <Box className="foot4">
        <img src={foot} alt="foot image 3" />
      </Box>
      <Box className="foot5">
        <img src={foot} alt="foot image 3" />
      </Box>
      <Box className="foot7">
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

        <Grid
          item
          xs={12}
          sm={10}
          sx={{ width: "100%" }}
          container
          justifyContent="center" // Centrado horizontal
          alignItems="center" // Centrado vertical
          height="100%"
        >
          <Grid
            item
            sm={12}
            md={5}
            display={"flex"}
            justifyContent="center" // Centrado horizontal
            alignItems="center"
            p="10px"
          >
            <CustomNavCard items={turnos} text={"Turnos"} image={turnoImg} />
          </Grid>
          <Grid
            item
            sm={12}
            md={5}
            display={"flex"}
            justifyContent="center" // Centrado horizontal
            alignItems="center"
            p="10px"
          >
            <CustomNavCard
              items={veterinarios}
              text={"Veterinarios"}
              image={veterinariosImg}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ConfigurationSection;