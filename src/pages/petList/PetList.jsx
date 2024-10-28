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
  TextField,
} from "@mui/material";
import "./PetList.css";
import { useEffect, useState } from "react";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import { LoadingButton } from "@mui/lab";
import useGetAllPets from "../../hooks/pet/getAllPets";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TaskIcon from "@mui/icons-material/Task";
import useDeletePet from "../../hooks/pet/useDeletePet";
import CustomButton from "../../components/customButton/CustomButton";

const PetList = ({ setUser }) => {
  const [usuarioEliminar, setUsuarioEliminar] = useState("");
  const { pet, isLoading, error, refetch } = useGetAllPets();
  const [petList, setPetList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { deletedPet, status } = useDeletePet();
  const [filteredPetList, setFilteredPetList] = useState([]);

  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (pet) {
      setPetList(pet);
      setFilteredPetList(pet);
    }
  }, [pet]);

  const searchPetByName = () => {
    if (searchTerm.trim() !== "") {
      const filtered = petList.filter((pet) =>
        pet.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPetList(filtered);
    } else {
      setFilteredPetList(petList);
    }
  };

  useEffect(() => {
    const fetchUpdatedUsers = async () => {
      if (status === "success") {
        const updatedUsers = await refetch();
        setPetList(updatedUsers.data);
        setFilteredPetList(updatedUsers.data);
      }
    };

    fetchUpdatedUsers();
  }, [status, refetch]);

  const handleDeletePet = (userId) => {
    setUsuarioEliminar(userId);
    setOpenDialog(true);
  };

  const handleCheckPetSignature = (petId) => {
    navigate(`/client/pet/signature/${petId}`);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await deletedPet(usuarioEliminar);
    await refetch();
    setIsDeleting(false);
    setOpenDialog(false);
    setUsuarioEliminar(null);
    await refetch();
  };

  const handleCloseDialog = () => {
    setUsuarioEliminar(null);
    setOpenDialog(false);
  };
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
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
        <Box className="titlePage">Mascotas</Box>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item ml="30px">
            Nombre:
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Grid>
          <Grid item>
            <CustomButton text="Buscar" onClick={searchPetByName} />
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"} pt={2}>
          <Grid container xs={12} sm={11.5} smOffset={(0, 25)}>
            <TableContainer sx={{ width: "100%", margin: "auto" }}>
              <Table className="tableCellTitle">
                <TableHead>
                  <TableRow className="tableCellTitle">
                    <TableCell className="tableCellTitle">Nombre</TableCell>
                    <TableCell className="tableCellTitle">Raza</TableCell>
                    <TableCell className="tableCellTitle">Dueño</TableCell>
                    <TableCell className="tableCellTitle">Sexo</TableCell>
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
                  {filteredPetList?.map(
                    (pet, index) =>
                      pet.estado && (
                        <TableRow key={index}>
                          <TableCell className="tableCell">
                            {pet.nombre}
                          </TableCell>
                          <TableCell className="tableCell">
                            {pet.sexo}
                          </TableCell>
                          <TableCell className="tableCell">
                            {pet.duenio}
                          </TableCell>
                          <TableCell className="tableCell">
                            {pet.sexo}
                          </TableCell>
                          <TableCell className="tableCell">
                            <Box className="containerOptions">
                              {!pet.consentimiento ? (
                                <IconButton
                                  aria-label="delete"
                                  onClick={() =>
                                    handleCheckPetSignature(pet.id)
                                  }
                                >
                                  <NoteAddIcon />
                                </IconButton>
                              ) : (
                                <IconButton
                                  sx={{ color: "green" }}
                                  aria-label="delete"
                                  onClick={() =>
                                    handleCheckPetSignature(pet.id)
                                  }
                                >
                                  <TaskIcon />
                                </IconButton>
                              )}
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
                      )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
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
            ¿Estás seguro de que deseas eliminar esta mascota?
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
