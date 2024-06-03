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
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import "./UserList.css";
import useGetAllUsers from "../../hooks/users/useGetAllUsers";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const UserList = () => {
  const { user, isLoading, error } = useGetAllUsers();
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
                  {user?.map((user, index) => (
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
                          <Link to={`/user/updateUser/${index}`}>
                            <IconButton aria-label="edit">
                              <EditIcon />
                            </IconButton>
                          </Link>
                          <IconButton aria-label="delete">
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
    </Grid>
  );
};

export default UserList;
