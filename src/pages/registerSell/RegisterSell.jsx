import {
  Alert,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { StoreContext } from "../../store/StoreProvider";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import CustomButton from "../../components/customButton/CustomButton";
import CustomSelectTectBox2 from "../../components/customSelectTectBox copy/CustomSelectTectBox2";
import usePetCreate from "../../hooks/pet/usePetCreate";
import useGetAllCustomer from "../../hooks/customer/useGetAllCustomer";
import foot from "../../images/foot.jpg";
import * as yup from "yup";
import { types } from "../../store/StoreReducer";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const RegisterSell = ({ setUser }) => {
  const [store, dispatch] = useContext(StoreContext);
  const { products } = store;
  const schema = yup.object().shape({
    fechadepedido: yup.string().required("ingrese un valor"),
    formadepago: yup.string().required("ingrese un valor"),
    observaciones: yup.string(),
    owner: yup.string().required("ingrese un valor"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { clientes } = useGetAllCustomer();
  const [petExist, setPetExist] = useState(null);
  const { isLoading, createPet, error } = usePetCreate({
    setPetExist,
  });
  const onSubmit = (data) => {
    const { name, animal, raza, size, weight, sex, birthdate, owner } = data;
    const pet = {
      name,
      animal,
      raza,
      size,
      weight,
      sex,
      birthdate,
      owner,
    };
    createPet(pet);
  };
  const navigate = useNavigate();
  const Agregar = () => {
    navigate("/user/productList");
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
          {petExist && <Alert severity="error">El usuario ya existe</Alert>}
          <Box className="titlePage">Productos / Registrar productos</Box>

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
                Dueño:
              </Grid>
              <Grid item xs={7} md={4}>
                <CustomSelectTectBox2
                  register={register}
                  name="owner"
                  list={clientes}
                  valueKey="id"
                  labelKey="idpersona.email"
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
                          <TableCell className="tableCell">
                            ${product.precio}
                          </TableCell>
                          <TableCell className="tableCell">
                            {product.cantidad}
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
