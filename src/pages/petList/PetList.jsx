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
import "./PetList.css";
import { useEffect, useState } from "react";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import { LoadingButton } from "@mui/lab";
import useGetAllPets from "../../hooks/pet/getAllPets";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useDeletePet from "../../hooks/pet/useDeletePet";

const PetList = () => {
  const [usuarioEliminar, setUsuarioEliminar] = useState("");
  const { pet, isLoading, error, refetch } = useGetAllPets();
  const [petList, setPetList] = useState([]);
  const { deletedPet, status } = useDeletePet();

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (pet) {
      setPetList(pet);
    }
  }, [pet]);

  useEffect(() => {
    const fetchUpdatedUsers = async () => {
      if (status === "success") {
        const updatedUsers = await refetch();
        setPetList(updatedUsers.data);
      }
    };

    fetchUpdatedUsers();
  }, [status, refetch]);

  const handleDeletePet = (userId) => {
    setUsuarioEliminar(userId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await deletedPet(usuarioEliminar);
    setIsDeleting(false);
    setOpenDialog(false);
    setUsuarioEliminar(null);
  };

  const handleCloseDialog = () => {
    setUsuarioEliminar(null);
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
        <Box className="titlePage">Usuarios</Box>
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
                  {petList?.map((pet, index) => (
                    <TableRow key={index}>
                      <TableCell className="tableCell">{pet.nombre}</TableCell>
                      <TableCell className="tableCell">{pet.sexo}</TableCell>
                      <TableCell className="tableCell">
                        {pet.fechadenacimiento}
                      </TableCell>
                      <TableCell className="tableCell">
                        <Box className="containerOptions">
                          <Link to={`/pet/updatePet/${pet.id}`}>
                            <IconButton aria-label="edit">
                              <EditIcon />
                            </IconButton>
                          </Link>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeletePet(pet.id)}
                          >
                            <DeleteIcon />
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

export default PetList;
