import { useContext, useState } from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import "./CatalogView.css";
import useGetProducts from "../../hooks/produts/useGetProducts";
import { StoreContext } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";
import { useNavigate } from "react-router-dom";



const ProductList = () => {
    const { products, isLoading, error } = useGetProducts();


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
        <Box className="titlePage">Productos/Listado de productos</Box>
        <Box>
          <Grid container className="tableContainer" rowGap={2}>
            <TableContainer>
              <Table className="tableCellTitle">
                <TableHead>
                  <TableRow className="tableCellTitle">
                    <TableCell className="tableCellTitle">Código de producto</TableCell>
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
                  {products?.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="tableCell">
                        {product.codigoproducto}
                      </TableCell>
                      <TableCell className="tableCell">
                        {product.nombre}
                      </TableCell>
                      <TableCell className="tableCell">
                        {product.precio}
                      </TableCell>
                      <TableCell className="tableCell">
                        {product.stock}
                      </TableCell>
                      <TableCell className="tableCell">
                        {product.idcategoria.nombrecategoria}
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

export default ProductList;
