import { Alert, Box, Grid } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../../components/customButton/CustomButton";
import foot from "../../images/foot.jpg";
import CustomSelectTectBox2 from "../../components/customSelectTectBox copy/CustomSelectTectBox2";
import { useState } from "react";
import useGetRace from "../../hooks/pet/useGetRace";
import useGetAnimal from "../../hooks/pet/useGetAnimal";
import usePetCreate from "../../hooks/pet/usePetCreate";
import useGetAllCustomer from "../../hooks/customer/useGetAllCustomer";
const ClientesRegistroMascota = ({ setUser }) => {
  const schema = yup.object().shape({
    name: yup.string().required("ingrese un valor"),
    animal: yup.string().required("ingrese un valor"),
    raza: yup.string().required("ingrese un valor"),
    size: yup.string(),
    weight: yup.string(),
    sex: yup.string(),
    birthdate: yup.string(),
    owner: yup.string().required("ingrese un valor"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { raza } = useGetRace();
  const { animal } = useGetAnimal();
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
          <Box className="titlePage">Clientes / Registro de mascotas</Box>

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
                Nombre:
              </Grid>
              <Grid item xs={7} md={4}>
                <CustomTextBox type="text" register={register} name="name" />
                <p className="errorText">{errors.name?.message}</p>
              </Grid>
              <Grid item xs={5} md={2} className="textInput">
                Tamaño:
              </Grid>
              <Grid item xs={7} md={4}>
                <CustomTextBox type="text" register={register} name="size" />
                <p className="errorText">{errors.size?.message}</p>
              </Grid>
              <Grid item xs={5} md={2} className="textInput">
                Animal:
              </Grid>
              <Grid item xs={7} md={4}>
                <CustomSelectTectBox2
                  register={register}
                  name="animal"
                  list={animal}
                  valueKey="id"
                  labelKey="descripcion"
                />
                <p className="errorText">{errors.animal?.message}</p>
              </Grid>
              <Grid item xs={5} md={2} className="textInput">
                Raza:
              </Grid>
              <Grid item xs={7} md={4}>
                <CustomSelectTectBox2
                  register={register}
                  name="raza"
                  list={raza}
                  valueKey="id"
                  labelKey="descripcion"
                />
                <p className="errorText">{errors.raza?.message}</p>
              </Grid>

              <Grid item xs={5} md={2} className="textInput">
                Peso:
              </Grid>
              <Grid item xs={7} md={4}>
                <CustomTextBox type="text" register={register} name="weight" />
                <p className="errorText">{errors.weight?.message}</p>
              </Grid>
              <Grid item xs={5} md={2} className="textInput">
                Sexo:
              </Grid>
              <Grid item xs={7} md={4}>
                <CustomTextBox type="text" register={register} name="sex" />
                <p className="errorText">{errors.sex?.message}</p>
              </Grid>
              <Grid item xs={5} md={2} className="textInput">
                Fecha de nacimiento:
              </Grid>
              <Grid item xs={7} md={4}>
                <CustomTextBox
                  type="date"
                  register={register}
                  name="birthdate"
                />
                <p className="errorText">{errors.birthdate?.message}</p>
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

export default ClientesRegistroMascota;
