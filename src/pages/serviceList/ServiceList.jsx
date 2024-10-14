import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import useGetAllServices from "../../hooks/turn/useGetAllServices";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useUpdateCostService } from "../../hooks/turn/useUpdateCostService";

const ServiceList = ({ setUser }) => {
  const { error, isLoading, services, refetch } = useGetAllServices();
  const {
    error: eUC,
    isLoading: lUC,
    updateCost,
    completeUpdate,
  } = useUpdateCostService();

  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newCost, setNewCost] = useState("");

  useEffect(() => {
    refetch();
  }, [completeUpdate]);

  // Función para abrir el diálogo y seleccionar el servicio
  const handleOpenDialog = (service) => {
    setSelectedService(service);
    setNewCost(service.costounitario); // Inicializa con el costo actual
    setOpen(true);
  };

  // Función para cerrar el diálogo
  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedService(null);
    setNewCost("");
  };

  // Función para manejar la edición del costo unitario
  const handleSave = () => {
    if (!isNaN(newCost) && newCost.trim() !== "") {
      updateCost({
        idtiposervico: selectedService.id,
        precio: newCost,
      });
      // Aquí puedes hacer la llamada a la API para actualizar el costo en la base de datos
    } else {
      alert("Por favor ingrese un valor numérico válido.");
    }
    handleCloseDialog(); // Cierra el diálogo después de guardar
  };

  return (
    <>
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
          <Box className="titlePage">Lista de Servicios</Box>

          <Box>
            <Grid container className="tableContainer" rowGap={2}>
              <TableContainer>
                <Table className="tableCellTitle">
                  <TableHead>
                    <TableRow className="tableCellTitle">
                      <TableCell className="tableCellTitle">Nombre</TableCell>
                      <TableCell className="tableCellTitle">
                        Costo Unitario
                      </TableCell>
                      <TableCell className="tableCellTitle">Opciones</TableCell>
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
                      </TableRow>
                    )}
                    {services?.map((service, index) => (
                      <TableRow key={index}>
                        <TableCell className="tableCell">
                          {service.nombre}
                        </TableCell>
                        <TableCell className="tableCell">
                          {service.costounitario}
                        </TableCell>

                        <TableCell className="tableCell">
                          <Box className="containerOptions">
                            <IconButton aria-label="edit">
                              <EditIcon
                                onClick={() => handleOpenDialog(service)}
                              />
                              {/* aqui quiero que caundo haga click en el boton se
                              despliegue una alert para que ingrese en nuevo
                              costo unitario */}
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>
        </Grid>
      </Grid>{" "}
      {/* Diálogo de edición */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Editar Costo Unitario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nuevo Costo Unitario"
            type="number"
            fullWidth
            value={newCost}
            onChange={(e) => setNewCost(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ServiceList;
