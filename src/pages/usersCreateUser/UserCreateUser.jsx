import { Alert, Box, Grid } from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../../components/customButton/CustomButton";
import { useUserCreate } from "../../hooks/useUserCreate";
import foot from "../../images/foot.jpg";
import { useState } from "react";
import CustomSelectTectBox from "../../components/customSelectTectBox/CustomSelectTectBox";
import "./UserCreateUser.css";

const UserCreateUser = ({ setUser }) => {
  const schema = yup.object().shape({
    name: yup.string().required("insert value"),
    lastName: yup.string().required("insert value"),
    email: yup.string().email("it must be a e-mail").required("insert value"),
    phoneNumber: yup.string().required("insert value"),
    birthdate: yup.string().required("insert value"),
    userType: yup.string().required("insert value"),
    password: yup
      .string()
      .min(4, "It must have 4 characters")
      .max(20, "It must be less than 20 characters")
      .required("insert value"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [userExist, setUserExist] = useState(null);
  const { isLoading, createUser, error } = useUserCreate({
    setUserExist,
  });

  const onSubmit = (data) => {
    const {
      name,
      lastName,
      email,
      phoneNumber,
      birthdate,
      userType,
      password,
    } = data;
   
    const user = {
      name,
      lastName,
      email,
      phoneNumber,
      birthdate,
      userType,
      password,
    };
    createUser(user);
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
          {/* {error && (
            <Alert severity="error">
          {error}
            </Alert>
          )} */}
          {/* {userExist && <Alert severity="error">El usuario ya existe</Alert>} */}
          <Box className="titlePage">Usuarios / Crear usuario</Box>

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
                <CustomTextBox type="text" register={register} name="email" />
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
                Contraseña
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

export default UserCreateUser;
