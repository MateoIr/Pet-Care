import { Alert, Box, Grid } from "@mui/material";
import { useState } from "react";
import { useUserCreate } from "../../hooks/useUserCreate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import foot from "../../images/foot.jpg";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomButton from "../../components/customButton/CustomButton";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import "./RegisterCustomer.css";
import CustomSelectTectBox2 from "../../components/customSelectTectBox copy/CustomSelectTectBox2";
import {
  useGetLocalidad,
  useGetPais,
  useGetProvincia,
} from "../../hooks/useUbications";

const RegisterCustomer = ({ setUser }) => {
  const schema = yup.object().shape({
    nombre: yup.string().required("ingrese un valor"),
    apellido: yup.string().required("ingrese un valor"),
    email: yup
      .string()
      .email("debe ingresar un email")
      .required("ingrese un valor"),
    telefono: yup.string().required("ingrese un valor"),
    fechadenacimiento: yup.string(),
    calle: yup.string(),
    numero: yup.string(),
    departamento: yup.string(),
    piso: yup.string(),
    barrio: yup.string(),
    localidad: yup.string(),
    provincia: yup.string(),
    pais: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { provincias } = useGetProvincia();
  const { localidades } = useGetLocalidad();
  const { paises } = useGetPais();

  const [userExist, setUserExist] = useState(null);
  const { isLoading, createUser, error } = useUserCreate({
    setUserExist,
  });
  const onSubmit = (data) => {
    const {
      nombre,
      apellido,
      email,
      telefono,
      fechadenacimiento,
      calle,
      numero,
      departamento,
      piso,
      barrio,
      localidad,
      provincia,
      pais,
    } = data;

    const cliente = {
      nombre,
      apellido,
      email,
      telefono,
      fechadenacimiento,
      iddireccion: {
        calle,
        numero,
        departamento,
        piso,
        barrio,
        idlocalidad: {
          localidad,
          idprovincia: {
            provincia,
            idpais: {
              pais,
            },
          },
        },
      },

      provincia,
      pais,
    };
    createUser(cliente);
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
          {userExist && <Alert severity="error">El usuario ya existe</Alert>}
          <Box className="titlePage">Clientes / Registrar cliente</Box>

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
                Apellido:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="apellido"
                />
                <p className="errorText">{errors.apellido?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Email:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox type="text" register={register} name="email" />
                <p className="errorText">{errors.email?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Telefono:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="telefono"
                />
                <p className="errorText">{errors.telefono?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Calle:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox type="text" register={register} name="calle" />
                <p className="errorText">{errors.calle?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Número:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox type="text" register={register} name="numero" />
                <p className="errorText">{errors.numero?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Departamento:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="departamento"
                />
                <p className="errorText">{errors.departamento?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Piso:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox type="text" register={register} name="piso" />
                <p className="errorText">{errors.piso?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Barrio:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox type="text" register={register} name="barrio" />
                <p className="errorText">{errors.barrio?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Localidad:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomSelectTectBox2
                  register={register}
                  name="localidad"
                  list={localidades}
                  valueKey="id"
                  labelKey="descripcion"
                />
                <p className="errorText">{errors.localidad?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Provincia:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomSelectTectBox2
                  register={register}
                  name="provincia"
                  list={provincias}
                  valueKey="id"
                  labelKey="descripcion"
                />
                <p className="errorText">{errors.provincia?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Pais:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomSelectTectBox2
                  register={register}
                  name="pais"
                  list={paises}
                  valueKey="id"
                  labelKey="descripcion"
                />
                <p className="errorText">{errors.pais?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Sexo:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox type="text" register={register} name="sexo" />
                <p className="errorText">{errors.sexo?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Fecha de nacimiento:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="fechadenacimiento"
                />
                <p className="errorText">{errors.fechadenacimiento?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                <CustomButton
                  onClick={handleSubmit(onSubmit)}
                  text="mascota"
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6} md={3} sx={{ mb: 2 }}>
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

export default RegisterCustomer;
