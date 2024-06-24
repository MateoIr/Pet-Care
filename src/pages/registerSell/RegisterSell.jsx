import {
  Alert,
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/StoreProvider";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import CustomButton from "../../components/customButton/CustomButton";
import CustomSelectTectBox2 from "../../components/customSelectTectBox copy/CustomSelectTectBox2";
import useSellCreate from "../../hooks/produts/useSellCreate";
import useGetAllCustomer from "../../hooks/customer/useGetAllCustomer";
import foot from "../../images/foot.jpg";
import * as yup from "yup";
import {
  addToBill,
  decrementProduct,
  deleteProduct,
  incrementProduct,
} from "../../store/StoreReducer";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";

const RegisterSell = ({ setUser }) => {
  const [store, dispatch] = useContext(StoreContext);
  const { products, bill } = store;
  const schema = yup.object().shape({
    fechadepedido: yup.string().required("ingrese un valor"),
    formadepago: yup.string().required("ingrese un valor"),
    observaciones: yup.string(),
    owner: yup.string().required("ingrese un valor"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { clientes } = useGetAllCustomer();
  const today = dayjs().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const { isLoading, createSell, error } = useSellCreate();
  const onSubmit = (data) => {
    const { fechadepedido, formadepago, observaciones, owner } = data;
    const idestado = 1;
    const detalleVenta = products.map((producto) => {
      return {
        idproducto: producto.id,
        cantidad: producto.cantidad,
        precio: producto.precio,
      };
    });

    const sell = {
      fechadepedido,
      observaciones,
      owner,
      formadepago,
      idestado,
      detalleVenta,
    };
    createSell(sell);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (bill.length > 0) {
      const { fechadepedido, formadepago, observaciones, owner } = bill[0];
      setValue("fechadepedido", fechadepedido);
      setValue("formadepago", formadepago);
      setValue("observaciones", observaciones);
      setValue("owner", owner);
      setSelectedDate(fechadepedido);
    }
  }, [bill, setValue]);

  const Agregar = () => {
    handleSubmit((data) => {
      dispatch(addToBill(data));
      navigate("/user/productList");
    })();
  };
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  const handleDecrement = (id) => {
    dispatch(decrementProduct(id));
  };
  const handleIncrement = (id) => {
    dispatch(incrementProduct(id));
  };

  return (
    <>
      <Box className="footRight">
        <img src={foot} alt="foot image 2" />
      </Box>
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
              Error al conectarce con la base de datos
            </Alert>
          )}
          <Box className="titlePage">Productos / Registrar pedido de venta</Box>

          <Box>
            <Grid
              container
              sx={{
                alignItems: "start",
                padding: 3,
                width: "100%",
              }}
              rowGap={2}
              columnSpacing={2}
            >
              <Grid item xs={5} md={2} className="textInput">
                Fecha de pedido:
              </Grid>
              <Grid item xs={7} md={4}>
                <CustomTextBox
                  value={selectedDate}
                  onChange={(date) =>
                    handleDateChange(dayjs(date).format("YYYY-MM-DD"))
                  }
                  type="date"
                  register={register}
                  name="fechadepedido"
                />
                <p className="errorText">{errors.fechadepedido?.message}</p>
              </Grid>
              <Grid item xs={5} md={2} className="textInput">
                Forma de pago:
              </Grid>
              <Grid item xs={7} md={4}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="formadepago"
                />
                <p className="errorText">{errors.formadepago?.message}</p>
              </Grid>
              <Grid item xs={5} md={2} className="textInput">
                Cliente:
              </Grid>
              <Grid item xs={7} md={4}>
                <CustomSelectTectBox2
                  register={register}
                  name="owner"
                  list={clientes}
                  valueKey="id"
                  labelKey="idpersona.email"
                  selectedItem={bill[0]?.owner}
                />
                <p className="errorText">{errors.owner?.message}</p>
              </Grid>
              <Grid item xs={5} md={2} className="textInput">
                Observaciones:
              </Grid>

              <Grid item xs={7} md={4}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="observaciones"
                />
                <p className="errorText">{errors.observaciones?.message}</p>
              </Grid>

              <Grid item xs={12} md={12}>
                <TableContainer>
                  <Table className="tableCellTitle">
                    <TableHead>
                      <TableRow className="tableCellTitle">
                        <TableCell className="tableCellTitle">
                          Código de producto
                        </TableCell>
                        <TableCell className="tableCellTitle">
                          Producto
                        </TableCell>
                        <TableCell className="tableCellTitle">
                          Precio unitario
                        </TableCell>
                        <TableCell className="tableCellTitle">
                          Cantidad
                        </TableCell>
                        <TableCell className="tableCellTitle">
                          Opciones
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading && (
                        <TableRow>
                          <TableCell colSpan={4} className="tableCellLoading">
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
                          <TableCell
                            className="tableCell"
                            sx={{ textAlign: "center" }}
                          >
                            ${product.precio}
                          </TableCell>
                          <TableCell
                            className="tableCell"
                            sx={{ textAlign: "center" }}
                          >
                            {product.cantidad}
                          </TableCell>
                          <TableCell className="tableCell" width={120}>
                            <Grid container width={"100%"}>
                              <Grid item xs={4}>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleDelete(product.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                              <Grid item xs={4}>
                                <IconButton
                                  aria-label="add"
                                  onClick={() => handleIncrement(product.id)}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Grid>
                              <Grid item xs={4}>
                                <IconButton
                                  aria-label="remove"
                                  onClick={() => handleDecrement(product.id)}
                                >
                                  <RemoveIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} md={6}>
                <CustomButton
                  onClick={Agregar}
                  text="Agregar"
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <CustomButton
                  onClick={handleSubmit(onSubmit)}
                  text="Guardar"
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterSell;
