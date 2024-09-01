import { Alert, Box, Grid } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../../components/customButton/CustomButton";
import foot from "../../images/foot.jpg";
import { useEffect, useState } from "react";
import CustomSelectTectBox from "../../components/customSelectTectBox/CustomSelectTectBox";
import { useParams } from "react-router-dom";
import useSelectedUser from "../../hooks/users/useSelectedUser";
import useUpdateUser from "../../hooks/users/useUpdateUser";

const UpdateUser = ({ setUser }) => {
  const schema = yup.object().shape({
    name: yup.string().required("ingrese un valor"),
    lastName: yup.string().required("ingrese un valor"),
    phoneNumber: yup
      .string()
      .required("ingrese un valor")
      .matches(/^[0-9]+$/, "solo acepta caracteres numericos"),
    birthdate: yup.string().required("ingrese un valor"),
    userType: yup.string().required("ingrese un valor"),
    password: yup
      .string()
      .min(4, "debe tener mas de 4 caracteres")
      .max(20, "debe tener menos de 20 caracteres")
      .required("ingrese un valor"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Permite establecer valores iniciales
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { id } = useParams();
  const { userSelected, isLoading, error } = useSelectedUser(id);

  useEffect(() => {
    if (userSelected) {
      setValue("name", userSelected?.idpersona?.nombre || "");
      setValue("lastName", userSelected?.idpersona?.apellido || "");
      setValue("email", userSelected?.idpersona?.email || "");
      setValue("phoneNumber", userSelected?.idpersona?.telefono || "");
      setValue("birthdate", userSelected?.idpersona?.fechadenacimiento || "");
      setValue("password", userSelected?.contrasena || "");
    }
  }, [userSelected, setValue]);

  const { updateUser } = useUpdateUser();

  const onSubmit = (data) => {
    const { name, lastName, phoneNumber, birthdate, userType, password } = data;

    const user = {
      id,
      name,
      lastName,
      email: data.email, // Usando el valor del formulario
      phoneNumber,
      birthdate,
      userType,
      password,
    };
    updateUser(user);
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
          <Box className="titlePage">Usuarios / Modificar usuario</Box>
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
                <CustomTextBox type="text" register={register} name="name" />
                <p className="errorText">{errors.name?.message}</p>
              </Grid>

              <Grid item xs={6} className="textInput">
                Apellido:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="lastName"
                />
                <p className="errorText">{errors.lastName?.message}</p>
              </Grid>

              <Grid item xs={6} className="textInput">
                Email:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="email"
                  disabled={true}
                />
                <p className="errorText">{errors.email?.message}</p>
              </Grid>

              <Grid item xs={6} className="textInput">
                Teléfono:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="phoneNumber"
                />
                <p className="errorText">{errors.phoneNumber?.message}</p>
              </Grid>

              <Grid item xs={6} className="textInput">
                Fecha de nacimiento:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox
                  type="date"
                  register={register}
                  name="birthdate"
                />
                <p className="errorText">{errors.birthdate?.message}</p>
              </Grid>

              <Grid item xs={6} className="textInput">
                Contraseña:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox
                  type="password"
                  register={register}
                  name="password"
                />
                <p className="errorText">{errors.password?.message}</p>
              </Grid>

              <Grid item xs={6} className="textInput">
                Tipo de usuario:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomSelectTectBox register={register} name="userType" />
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

export default UpdateUser;
