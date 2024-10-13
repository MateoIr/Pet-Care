import { Alert, Box, Grid } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../../components/customButton/CustomButton";
import foot from "../../images/foot.jpg";
import { useEffect, useState } from "react";
import CustomSelectTectBox2 from "../../components/customSelectTectBox copy/CustomSelectTectBox2";
import { useParams } from "react-router-dom";
import useSelectedProduct from "../../hooks/produts/useSelectedProduct";
import useUpdateProduct from "../../hooks/produts/useUpdateProduct";
import useGetCategory from "../../hooks/useGetCategory";

const UpdateProduct = ({ setUser }) => {
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
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { id } = useParams();
  const { productSelected, isLoading, error } = useSelectedProduct(id);
  const { categorias } = useGetCategory();

  useEffect(() => {
    if (productSelected) {
      setValue("id", productSelected?.id || "");
      setValue("nombre", productSelected?.nombre || "");
      setValue("codigoproducto", productSelected?.codigoproducto || "");
      setValue("precio", productSelected?.precio || "");
      setValue("stock", productSelected?.stock || "");
      setValue("idcategoria", productSelected?.idcategoria || "");
    }
  }, [productSelected, setValue]);

  const { updateProduct } = useUpdateProduct();

  const onSubmit = (data) => {
    //console.log(data.idcategoria);
    const { id, nombre, codigoproducto, precio, stock, idcategoria } = data;

    const product = {
      id,
      nombre,
      codigoproducto,
      precio,
      stock,
      idcategoria,
    };

    updateProduct(product);
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
          <Box className="titlePage">Producto / Modificar producto</Box>
          <Box>
            <Grid
              container
              sx={{
                alignItems: "start",
                width: { xs: "80%", sm: "70%", lg: "50%" },
              }}
              rowGap={2}
            >
              <Grid item xs={6} className="textInput">
                Nombre:
              </Grid>
              <Grid item xs={6} md={4}>
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
                <CustomTextBox type="text" register={register} name="stock" />
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
                  selectedItem={productSelected?.idcategoria.id}
                />
                <p className="errorText">{errors.idcategoria?.message}</p>
              </Grid>

              <Grid item xs={6} className="textInput"></Grid>
              <Grid item xs={6} md={4} sx={{ mb: 2 }}>
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

export default UpdateProduct;
