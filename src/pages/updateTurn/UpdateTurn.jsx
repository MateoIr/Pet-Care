import {
    Box,
    Button,
    Checkbox,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Tab,
  } from "@mui/material";
  import CustomNavBar from "../../components/customNavBar/CustomNavBar";
  import { TabContext, TabList, TabPanel } from "@mui/lab";
  import { useState } from "react";
  import { useParams } from "react-router-dom";
  import UpdateHairdressing from "./UpdateHairdressing";
  import UpdateVetTurn from "./UpdateVetTurn";
  import fondo from  "../../images/fondo1.png"
  import UpdateDaycare from "./UpdateDaycare";


  const UpdateTurn = ({ setUser }) => {
    const { idtipo } = useParams(); // Get the idtipo from the URL
    const [value, setValue] = useState(idtipo || "1"); // Use idtipo as initial state, default to "1" if undefined
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <>
        <Grid
          container
          sx={{
            backgroundSize: "auto",
            backgroundPosition: "bottom center",
            backgroundRepeat: "no-repeat",
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
            <Box className="titlePage">Turno / Modificar Turno</Box>
            <Box sx={{ width: "100%", typography: "body1", pl: 0.5 }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "#805454",
                      },
                    }}
                  >
                    <Tab
                      label="Guardería"
                      value="1"
                      sx={{
                        color: value === "1" ? "#805454" : "black",
                        "&.Mui-selected": {
                          color: "#805454",
                        },
                        "&:hover": { color: "#805454" },
                      }}
                      disabled // Disable the tab to prevent interaction

                    />
                    <Tab
                      label="Veterinaria"
                      value="3"
                      sx={{
                        color: value === "3" ? "#805454" : "black",
                        "&.Mui-selected": {
                          color: "#805454",
                        },
                        "&:hover": { color: "#805454" },
                      }}
                      disabled // Disable the tab to prevent interaction

                    />
                    <Tab
                      label="Peluquería"
                      value="2"
                      sx={{
                        color: value === "2" ? "#805454" : "black",
                        "&.Mui-selected": {
                          color: "#805454",
                        },
                        "&:hover": { color: "#805454" },
                      }}
                      disabled // Disable the tab to prevent interaction

                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <UpdateDaycare />
                </TabPanel>
                <TabPanel value="3">
                  <UpdateVetTurn />
                </TabPanel>
                <TabPanel value="2">
                  <UpdateHairdressing />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
  
  export default UpdateTurn;