import { Alert, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import foot from "../../images/foot.jpg";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomButton from "../../components/customButton/CustomButton";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import CustomSelectTectBox2 from "../../components/customSelectTectBox copy/CustomSelectTectBox2";
import { useGetPais, useGetProvincia } from "../../hooks/useUbications";
import useGetAllClinics from "../../hooks/clinic/useGetAllClinics";
import useRegisterVeterinarian from "../../hooks/veterinarian/useRegisterVeterinarian";

const RegisterVeterinarian = ({ setUser }) => {
  const schema = yup.object().shape({
    matricula: yup.string().required("ingrese un valor"),
    clinicas: yup.string().required("ingrese un valor"),
    nombre: yup.string().required("ingrese un valor"),
    apellido: yup.string().required("ingrese un valor"),
    email: yup
      .string()
      .email("debe ingresar un email")
      .required("ingrese un valor"),
    telefono: yup.string().required("ingrese un valor"),
    fechadenacimiento: yup.string().required("ingrese un valor"),
    calle: yup.string().required("ingrese un valor"),
    numCalle: yup.string().required("ingrese un valor"),
    departamento: yup.string(),
    piso: yup.string(),
    barrio: yup.string().required("ingrese un valor"),
    localidad: yup.string().required("ingrese un valor"),
    provincia: yup.string().required("ingrese un valor"),
    pais: yup.string().required("ingrese un valor"),
  });

  const [county, setCounty] = useState(null);
  const [filteredProvinces, setFilteredProvinces] = useState([]);

  const { provincias } = useGetProvincia();
  const { paises } = useGetPais();
  const { clinics } = useGetAllClinics();

  useEffect(() => {
    if (county != null) {
      const filtered = provincias.filter(
        (provincia) => provincia.idpais.id === county
      );
      setFilteredProvinces(filtered);
    } else {
      setFilteredProvinces(provincias);
    }
  }, [county, provincias]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [userExist, setUserExist] = useState(null);
  const { isLoading, createVeterinarian, error } = useRegisterVeterinarian({
    setUserExist,
  });

  const onSubmit = (data) => {
    const {
      matricula,
      clinicas: clinics,
      nombre,
      apellido,
      email,
      telefono,
      fechadenacimiento,
      calle,
      numCalle,
      departamento,
      piso,
      barrio,
      localidad,
      provincia,
    } = data;

    const veterinarian = {
      matricula,
      clinics,
      nombre,
      apellido,
      fechadenacimiento,
      email,
      telefono,
      barrio,
      piso,
      departamento,
      provincia,
      localidad,
      calle,
      numCalle,
    };
    createVeterinarian(veterinarian);
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
              Este correo ya peretenece a un Veterinario
            </Alert>
          )}
          {userExist && (
            <Alert severity="error">El Veterinario ya existe</Alert>
          )}
          <Box className="titlePage">Turnos / Registrar Veterinarios</Box>

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
                Matricula:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="matricula"
                />
                <p className="errorText">{errors.matricula?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Clinica:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomSelectTectBox2
                  register={register}
                  name="clinicas"
                  list={clinics}
                  valueKey="id"
                  labelKey="nombre"
                />
                <p className="errorText">{errors.clinics?.message}</p>
              </Grid>
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
                <CustomTextBox
                  type="text"
                  register={register}
                  name="numCalle"
                />
                <p className="errorText">{errors.numCalle?.message}</p>
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
                <CustomTextBox
                  type="text"
                  register={register}
                  name="localidad"
                />

                <p className="errorText">{errors.localidad?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Pais:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomSelectTectBox2
                  filtro={setCounty}
                  register={register}
                  name="pais"
                  list={paises}
                  valueKey="id"
                  labelKey="descripcion"
                />
                <p className="errorText">{errors.pais?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Provincia:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomSelectTectBox2
                  register={register}
                  name="provincia"
                  list={filteredProvinces}
                  valueKey="id"
                  labelKey="descripcion"
                />
                <p className="errorText">{errors.provincia?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput">
                Fecha de Nacimiento:
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomTextBox
                  type="date"
                  register={register}
                  name="fechadenacimiento"
                />
                <p className="errorText">{errors.fechadenacimiento?.message}</p>
              </Grid>
              <Grid item xs={6} md={3} className="textInput"></Grid>
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

export default RegisterVeterinarian;
