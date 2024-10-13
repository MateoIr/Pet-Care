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
import "./ProductList.css";
import useGetProducts from "../../hooks/produts/useGetProducts";
import { StoreContext } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/customButton/CustomButton";

const ProductList = ({ setUser }) => {
  const { products, isLoading, error } = useGetProducts();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [store, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();

  // Extrae los códigos de productos ya añadidos al store
  const addedProductIds = store.products.map(
    (product) => product.codigoproducto
  );

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      const allProductIds = products
        .filter((product) => !addedProductIds.includes(product.codigoproducto))
        .map((product) => product.codigoproducto);
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantity = event.target.value;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  const handleAddProducts = () => {
    const selectedProductDetails = products.filter((product) =>
      selectedProducts.includes(product.codigoproducto)
    );

    selectedProductDetails.forEach((product) => {
      dispatch({
        type: types.productAdd,
        payload: {
          id: product.id,
          codigoproducto: product.codigoproducto,
          nombre: product.nombre,
          precio: product.precio,
          stock: product.stock,
          cantidad: quantities[product.codigoproducto] || 1,
        },
      });
    });

    navigate("/product/sell");
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
        <Box className="titlePage">Productos / Listado de Productos</Box>
        <Box>
          <Grid container className="tableContainer" rowGap={2}>
            <TableContainer>
              <Table className="tableCellTitle">
                <TableHead>
                  <TableRow className="tableCellTitle">
                    <TableCell className="tableCellTitle">Sumar</TableCell>
                    <TableCell className="tableCellTitle">
                      Código de producto
                    </TableCell>
                    <TableCell className="tableCellTitle">Producto</TableCell>
                    <TableCell className="tableCellTitle">
                      Precio unitario
                    </TableCell>
                    <TableCell className="tableCellTitle">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading && (
                    <TableRow>
                      <TableCell colSpan={5} className="tableCellLoading">
                        <LoadingButton loading>Submit</LoadingButton>
                      </TableCell>
                    </TableRow>
                  )}
                  {products?.map((product, index) => {
                    const isAdded = addedProductIds.includes(
                      product.codigoproducto
                    );
                    return (
                      <TableRow
                        key={index}
                        className={isAdded ? "rowDisabled" : ""}
                      >
                        <TableCell className="tableCell">
                          <Checkbox
                            checked={selectedProducts.includes(
                              product.codigoproducto
                            )}
                            onChange={() =>
                              handleCheckboxChange(product.codigoproducto)
                            }
                            disabled={isAdded}
                          />
                        </TableCell>
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
                          <Select
                            value={quantities[product.codigoproducto] || ""}
                            onChange={(event) =>
                              handleQuantityChange(
                                product.codigoproducto,
                                event
                              )
                            }
                            displayEmpty
                            disabled={isAdded}
                          >
                            <MenuItem value="" disabled>
                              Seleccionar
                            </MenuItem>
                            {Array.from(
                              { length: product.stock },
                              (_, i) => i + 1
                            ).map((value) => (
                              <MenuItem key={value} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <CustomButton
              text="Agregar Productos"
              onClick={handleAddProducts}
              disabled={selectedProducts.length === 0}
            />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductList;
