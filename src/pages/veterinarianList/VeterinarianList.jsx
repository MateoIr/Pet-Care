import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
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
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useGetVeterinarians from "../../hooks/veterinarian/useGetVeterinarians";
import useDeleteVeterinarian from "../../hooks/veterinarian/useDeleteVeterinarian";
const VeterinarianList = () => {
  const [veterinarianDrop, setVeterinarianDrop] = useState("");
  const { veterinarians, isLoading, error, refetch } = useGetVeterinarians();
  const [veterinariansList, setVeterinariansList] = useState([]);
  const { dropVeterinarian, status } = useDeleteVeterinarian();

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (veterinarians) {
      setVeterinariansList(veterinarians);
    }
  }, [veterinarians]);

  useEffect(() => {
    const fetchUpdatedUsers = async () => {
      if (status === "success") {
        const updatedUsers = await refetch();
        setVeterinariansList(updatedUsers.data);
      }
    };

    fetchUpdatedUsers();
  }, [status, refetch]);

  // Manejar la eliminación de un cliente
  const handleDeletePet = (userId) => {
    setVeterinarianDrop(userId);
    setOpenDialog(true);
  };

  // Confirmar y proceder con la eliminación
  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    try {
      await dropVeterinarian(veterinarianDrop);
      await refetch(); // Refrescar la lista de veterinarios después de eliminar

      // Restablecer estados
      setVeterinarianDrop(null);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting veterinarian:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Cerrar el diálogo sin eliminar
  const handleCloseDialog = () => {
    setVeterinarianDrop(null);
    setOpenDialog(false);
  };

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
        {error && (
          <Alert severity="error">
            No es posible conectarse con la base de datos
          </Alert>
        )}
        <Box className="titlePage">Veterinarios</Box>
        <Box>
          <Grid container className="tableContainer" rowGap={2}>
            <TableContainer>
              <Table className="tableCellTitle">
                <TableHead>
                  <TableRow className="tableCellTitle">
                    <TableCell className="tableCellTitle">Nombre</TableCell>
                    <TableCell className="tableCellTitle">Apellido</TableCell>
                    <TableCell className="tableCellTitle">Email</TableCell>
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
                      <TableCell className="tableCellLoading">
                        <LoadingButton loading>Submit</LoadingButton>
                      </TableCell>
                    </TableRow>
                  )}
                  {veterinariansList?.map(
                    (veterinarian, index) =>
                      veterinarian.estado && (
                        <TableRow key={index}>
                          <TableCell className="tableCell">
                            {veterinarian.idpersona.nombre}
                          </TableCell>
                          <TableCell className="tableCell">
                            {veterinarian.idpersona.apellido}
                          </TableCell>
                          <TableCell className="tableCell">
                            {veterinarian.idpersona.email}
                          </TableCell>
                          <TableCell className="tableCell">
                            <Box className="containerOptions">
                              <Link to={`/veterinarian/${veterinarian.id}`}>
                                <IconButton aria-label="edit">
                                  <EditIcon />
                                </IconButton>
                              </Link>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDeletePet(veterinarian.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Box>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default VeterinarianList;
