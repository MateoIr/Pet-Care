import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import "./UserList.css";
import useGetAllUsers from "../../hooks/users/useGetAllUsers";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import useDropUser from "../../hooks/users/useDropUser";

const UserList = () => {
  const [usuarioEliminar, setUsuarioEliminar] = useState("");
  const { user, isLoading, error, refetch } = useGetAllUsers();
  const [usersList, setUsersList] = useState([]);
  const { deleteUser, status } = useDropUser();

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      setUsersList(user);
    }
  }, [user]);

  useEffect(() => {
    const fetchUpdatedUsers = async () => {
      if (status === "success") {
        const updatedUsers = await refetch();
        setUsersList(updatedUsers.data);
      }
    };

    fetchUpdatedUsers();
  }, [status, refetch]);

  const handleDeleteUser = (userId) => {
    setUsuarioEliminar(userId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await deleteUser(usuarioEliminar);
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
                  {usersList?.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="tableCell">
                        {user.idpersona.nombre}
                      </TableCell>
                      <TableCell className="tableCell">
                        {user.idpersona.apellido}
                      </TableCell>
                      <TableCell className="tableCell">
                        {user.idpersona.email}
                      </TableCell>
                      <TableCell className="tableCell">
                        <Box className="containerOptions">
                          <Link to={`/user/updateUser/${user.id}`}>
                            <IconButton aria-label="edit">
                              <EditIcon />
                            </IconButton>
                          </Link>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteUser(user.id)}
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

export default UserList;
