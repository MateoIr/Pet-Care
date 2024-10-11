import { Box, Grid, Tab } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import Hairdressing from "./Hairdressing";
import Vet from "./Vet";
import fondo from "../../images/fondo1.png";
import RegisterDaycare from "./RegisterDaycare";

const TrunRegister = ({ setUser }) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Grid
        container
        sx={{
          backgroundImage: `url(${fondo})`, // Corregir aquí
          backgroundSize: "auto", // Ajusta según necesites (puedes usar 'contain' o un tamaño específico)
          backgroundPosition: "bottom center", // Coloca la imagen en la parte inferior
          backgroundRepeat: "no-repeat", // No repetir la imagen

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
          <Box className="titlePage">Turno / Registrar Turno</Box>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#805454", // Color del subrayado cuando está seleccionado
                    },
                  }}
                >
                  <Tab
                    label="Guardería"
                    value="1"
                    sx={{
                      color: value === "1" ? "#805454" : "black", // Color del texto en el tab seleccionado
                      "&.Mui-selected": {
                        color: "#805454", // Mantiene el color al estar seleccionado
                      },
                      "&:hover": { color: "#805454" }, // Efecto hover para el tab
                    }}
                  />
                  <Tab
                    label="Veterinaria"
                    value="2"
                    sx={{
                      color: value === "2" ? "#805454" : "black",
                      "&.Mui-selected": {
                        color: "#805454",
                      },
                      "&:hover": { color: "#805454" },
                    }}
                  />
                  <Tab
                    label="Peluquería"
                    value="3"
                    sx={{
                      color: value === "3" ? "#805454" : "black",
                      "&.Mui-selected": {
                        color: "#805454",
                      },
                      "&:hover": { color: "#805454" },
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <RegisterDaycare />
              </TabPanel>
              <TabPanel value="2">
                <Vet></Vet>
              </TabPanel>
              <TabPanel value="3">
                <Hairdressing />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TrunRegister;
