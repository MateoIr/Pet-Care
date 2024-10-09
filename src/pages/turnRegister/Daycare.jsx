import React, { useState } from "react";
import Calendar from "./Calendar";
import RegisterDaycare from "./RegisterDaycare";
import CustomButton from "../../components/customButton/CustomButton";
import { Box, Grid } from "@mui/material";

const Daycare = () => {
  const [registerClose, setRegisterClose] = useState(false);

  return (
    <Grid container>
      <Grid item xs={12} md={4} lg={2}>
        <Box sx={{ maxWidth: 200, width: "100%", pb: 2 }}>
          {" "}
          {/* Corregido: Se aplica maxWidth aquí */}
          <CustomButton
            text={"agregar turno"}
            onClick={() => setRegisterClose(!registerClose)}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        {" "}
        {/* Asegúrate de tener otro Grid para el contenido */}
        {registerClose ? <RegisterDaycare /> : <Calendar />}
      </Grid>
    </Grid>
  );
};

export default Daycare;
