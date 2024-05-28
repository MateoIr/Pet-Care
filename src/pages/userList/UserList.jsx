import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";

const UserList = () => {
  return (
    <Grid
      container
      sx={{
        textAlign: "center",
        height: "100vh",
        alignItems: "start",
      }}
    >
      <Grid item xs={12} sm={2}>
        <Box>
          <CustomNavBar />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        sx={{
          height: "90%",
        }}
      >
        <Box className="titlePage">Usuarios </Box>
        <Box>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "900px",
              width: "auto",
              paddingX: "20px",
            }}
            rowGap={2}
          >
            <TableContainer>
              <Table sx={{ border: "2px dotted grey" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ border: "2px dotted grey" }}>
                      Nombre
                    </TableCell>
                    <TableCell sx={{ border: "2px dotted grey" }}>
                      Apellido
                    </TableCell>
                    <TableCell sx={{ border: "2px dotted grey" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ border: "2px dotted grey" }}>
                      Opciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: "2px dotted grey" }}>
                      Juan
                    </TableCell>
                    <TableCell sx={{ border: "2px dotted grey" }}>
                      Lopez
                    </TableCell>
                    <TableCell sx={{ border: "2px dotted grey" }}>
                      juan@gmail
                    </TableCell>
                    <TableCell sx={{ border: "2px dotted grey" }}>
                      Bla bla bla
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserList;
