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
import "./ClientList.css";
import { useEffect, useState } from "react";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useGetClient from "../../hooks/pet/getAllClients";
import useDeleteClient from "../../hooks/pet/useDeleteClient";

const ClientList = () => {
  const [clientEliminar, setClientEliminar] = useState("");
  const { client, isLoading, error, refetch } = useGetClient(); // refetch para actualizar clientes
  const [clientList, setClientList] = useState([]);
  const { deletedClient, status } = useDeleteClient(); // status para saber el estado de la eliminación

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (client) {
      setClientList(client);
    }
  }, [client]);

  useEffect(() => {
    const fetchUpdatedUsers = async () => {
      if (status === "success") {
        const updatedUsers = await refetch();
        setClientList(updatedUsers.data);
      }
    };

    fetchUpdatedUsers();
  }, [status, refetch]);

  // Manejar la eliminación de un cliente
  const handleDeletePet = (userId) => {
    setClientEliminar(userId);
    setOpenDialog(true);
  };

  // Confirmar y proceder con la eliminación
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await deletedClient(clientEliminar);
    await refetch();
    setIsDeleting(false);
    setOpenDialog(false);
    setClientEliminar(null);

    await refetch();
  };

  // Cerrar el diálogo sin eliminar
  const handleCloseDialog = () => {
    setClientEliminar(null);
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
                  {clientList?.map(
                    (client, index) =>
                      client.estado && (
                        <TableRow key={index}>
                          <TableCell className="tableCell">
                            {client.idpersona.nombre}
                          </TableCell>
                          <TableCell className="tableCell">
                            {client.idpersona.apellido}
                          </TableCell>
                          <TableCell className="tableCell">
                            {client.idpersona.email}
                          </TableCell>
                          <TableCell className="tableCell">
                            <Box className="containerOptions">
                              <Link to={`/pet/updatePet/${client.id}`}>
                                <IconButton aria-label="edit">
                                  <EditIcon />
                                </IconButton>
                              </Link>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDeletePet(client.id)}
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

export default ClientList;
