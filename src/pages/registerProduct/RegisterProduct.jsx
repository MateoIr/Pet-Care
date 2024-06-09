import { Alert, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useRegisterProduct } from "../../hooks/useRegisterProduct";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import foot from "../../images/foot.jpg";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomButton from "../../components/customButton/CustomButton";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import "./RegisterProduct.css";
import CustomSelectTectBox2 from "../../components/customSelectTectBox copy/CustomSelectTectBox2";
import useGetCategory from "../../hooks/useGetCategory";

const RegisterProduct = ({ setProduct }) => {
  const schema = yup.object().shape({
    nombre: yup.string().required("ingrese un valor"),
    codigoproducto: yup.string().required("ingrese un valor"),
    precio: yup.string().required("ingrese un valor"),
    stock: yup.string().required("ingrese un valor"),
    idcategoria: yup.string().required("ingrese un valor"),
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { categorias } = useGetCategory();


  const [productExist, setProductExist] = useState(null);
  const { isLoading, createProduct, error } = useRegisterProduct({
    setProductExist,
  });

  const onSubmit = (data) => {
    
    const {
      nombre,
      codigoproducto,
      precio,
      stock,
      idcategoria,
    } = data;
    
    const product = {
        nombre,
        codigoproducto,
        precio,
        stock,
        idcategoria,
    };

    createProduct(product);
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
            <CustomNavBar setProduct={setProduct} />
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
              Este codigo pertenece a un producto existente
            </Alert>
          )}
          {productExist && <Alert severity="error">El producto ya existe</Alert>}
          <Box className="titlePage">Producto / Registrar producto</Box>

          <Box>
            <Grid
              container
              sx={{
                alignItems: "start",
                width: { xs: "80%", sm: "70%", lg: "50%" },
              }}
              rowGap={2}
            >
              <Grid item xs={6} md={3} className="textInput">
                Nombre:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox type="text" register={register} name="nombre" />
                <p className="errorText">{errors.nombre?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Codigo de producto:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="codigoproducto"
                />
                <p className="errorText">{errors.codigoproducto?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Precio:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox type="text" register={register} name="precio" />
                <p className="errorText">{errors.precio?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Stock:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="stock"
                />
                <p className="errorText">{errors.stock?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Categoría:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomSelectTectBox2
                  register={register}
                  name="idcategoria"
                  list={categorias}
                  valueKey="id"
                  labelKey="nombrecategoria"
                />
                <p className="errorText">{errors.idcategoria?.message}</p>
              </Grid>
              
              <Grid item xs={3} md={9}></Grid>
              <Grid item xs={12} md={3} sx={{ mb: 2 }}>
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

export default RegisterProduct;
