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
import "./CatalogView.css";
import useGetProducts from "../../hooks/produts/useGetProducts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import useDropProduct from "../../hooks/produts/useDropProduct";

const ProductList = ({ setUser }) => {
  const [productoEliminar, setProductoEliminar] = useState("");
  const { products, isLoading, error, refetch } = useGetProducts();

  const [productsList, setProductsList] = useState([]);
  const { deleteProduct, status } = useDropProduct();

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (products) {
      setProductsList(products);
    }
  }, [products]);

  useEffect(() => {
    const fetchUpdatedProducts = async () => {
      if (status === "success") {
        const updatedProducts = await refetch();
        setProductsList(updatedProducts.data);
      }
    };

    fetchUpdatedProducts();
  }, [status, refetch]);

  const handleDeleteProduct = (productId) => {
    setProductoEliminar(productId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await deleteProduct(productoEliminar);
    setIsDeleting(false);
    setOpenDialog(false);
    setProductoEliminar(null);
  };

  const handleCloseDialog = () => {
    setProductoEliminar(null);
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
        <Box className="titlePage">Productos / Listado de productos</Box>
        <Box>
          <Grid container className="tableContainer" rowGap={2}>
            <TableContainer>
              <Table className="tableCellTitle">
                <TableHead>
                  <TableRow className="tableCellTitle">
                    <TableCell className="tableCellTitle">
                      Código de producto
                    </TableCell>
                    <TableCell className="tableCellTitle">Título</TableCell>
                    <TableCell className="tableCellTitle">Precio</TableCell>
                    <TableCell className="tableCellTitle">Stock</TableCell>
                    <TableCell className="tableCellTitle">Categoría</TableCell>
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
                      <TableCell className="tableCellLoading">
                        <LoadingButton loading>Submit</LoadingButton>
                      </TableCell>
                    </TableRow>
                  )}
                  {products?.map(
                    (product, index) =>
                      product.estado && (
                        <TableRow key={index}>
                          <TableCell className="tableCell">
                            {product.codigoproducto}
                          </TableCell>
                          <TableCell className="tableCell">
                            {product.nombre}
                          </TableCell>
                          <TableCell className="tableCell">
                            ${product.precio}
                          </TableCell>
                          <TableCell className="tableCell">
                            {product.stock}
                          </TableCell>
                          <TableCell className="tableCell">
                            {product.idcategoria.nombrecategoria}
                          </TableCell>
                          <TableCell className="tableCell">
                            <Box className="containerOptions">
                              <Link to={`/product/updateProduct/${product.id}`}>
                                <IconButton aria-label="edit">
                                  <EditIcon />
                                </IconButton>
                              </Link>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteProduct(product.id)}
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
            ¿Estás seguro de que deseas eliminar este producto?
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

export default ProductList;
