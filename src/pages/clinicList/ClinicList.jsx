import {
  Alert,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import { LoadingButton } from "@mui/lab";
import useGetAllClinics from "../../hooks/clinic/useGetAllClinics";
const ClinicList = ({ setUser }) => {
  const { clinics, isLoading, error } = useGetAllClinics();
  const [clinicsList, setClinicsList] = useState([]);

  useEffect(() => {
    if (clinics) {
      setClinicsList(clinics);
    }
  }, [clinics]);

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
          <CustomNavBar setUser={setUser} />
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
        {error && (
          <Alert severity="error">
            No es posible conectarse con la base de datos
          </Alert>
        )}
        <Box className="titlePage">Clinicas</Box>
        <Box>
          <Grid container className="tableContainer" rowGap={2}>
            <TableContainer>
              <Table className="tableCellTitle">
                <TableHead>
                  <TableRow className="tableCellTitle">
                    <TableCell className="tableCellTitle">Nombre</TableCell>
                    <TableCell className="tableCellTitle">Pais</TableCell>
                    <TableCell className="tableCellTitle">Provincia</TableCell>
                    <TableCell className="tableCellTitle">Localidad</TableCell>
                    <TableCell className="tableCellTitle">Calle</TableCell>
                    <TableCell className="tableCellTitle">Numero</TableCell>
                    {/* <TableCell className="tableCellTitle">Opciones</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading && (
                    <TableRow>
                      <TableCell className="tableCellLoading">
                        <LoadingButton loading>Submit</LoadingButton>
                      </TableCell>
                      <TableCell className="tableCellLoading">
                        <LoadingButton loading>Submit</LoadingButton>
                      </TableCell>
                      <TableCell className="tableCellLoading">
                        <LoadingButton loading>Submit</LoadingButton>
                      </TableCell>
                      <TableCell className="tableCellLoading">
                        <LoadingButton loading>Submit</LoadingButton>
                      </TableCell>
                    </TableRow>
                  )}
                  {clinicsList?.map((clinic, index) => (
                    <TableRow key={index}>
                      <TableCell className="tableCell">
                        {clinic.nombre}
                      </TableCell>
                      <TableCell className="tableCell">
                        {
                          clinic.iddireccion.idlocalidad.idprovincia.idpais
                            .descripcion
                        }
                      </TableCell>
                      <TableCell className="tableCell">
                        {clinic.iddireccion.idlocalidad.idprovincia.descripcion}
                      </TableCell>
                      <TableCell className="tableCell">
                        {clinic.iddireccion.idlocalidad.descripcion}
                      </TableCell>
                      <TableCell className="tableCell">
                        {clinic.iddireccion.calle}
                      </TableCell>
                      <TableCell className="tableCell">
                        {clinic.iddireccion.numero}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ClinicList;
