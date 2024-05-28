import { Link } from "react-router-dom";
import { Alert, Box, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import CustomButton from "../../components/customButton/CustomButton";
import foot from "../../images/foot.jpg";
import "./Login.css";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, user } = useLogin({ email, password, setUser });
  const schema = yup.object().shape({
    email: yup.string().email("it must be a e-mail").required("insert value"),
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
  console.log(error);

  const onSubmit = ({ email, password }) => {
    setEmail(email);
    setPassword(password);
  };
  return (
    <>
      <Box className="footLeftLogin">
        <img src={foot} alt="foot image 1" />
      </Box>
      <Box className="footRightLogin">
        <img src={foot} alt="foot image 2" />
      </Box>
      <Box className="dysplayContainer">
        <Box sx={{ width: 300, textAlign: "center" }}>
          <Typography className="titleLogin" sx={{ fontSize: "70px" }}>
            PET-CARE
          </Typography>
          <Box
            sx={{
              borderBottom: "1.4px solid #ffdfae",
              borderTop: "1.4px solid #ffdfae",
              marginTop: 6,
            }}
          >
            {error && (
              <Alert severity="error">
                Error al conectarce con la base de datos
              </Alert>
            )}
            <Grid
              spacing={3}
              container
              sx={{
                textAlign: "left",
                marginY: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item xs={4}>
                <Typography className="text" sx={{ fontSize: "17px" }}>
                  Correo:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <CustomTextBox type="text" register={register} name="email" />
                <p className="errorText">{errors.email?.message}</p>
              </Grid>
              <Grid item xs={4}>
                <Typography className="text" sx={{ fontSize: "17px" }}>
                  Contraseña:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <CustomTextBox
                  type="password"
                  register={register}
                  name="password"
                />
                <p className="errorText">{errors.password?.message}</p>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ paddingTop: 3, paddingBottom: 2, paddingX: 4 }}>
            <CustomButton
              onClick={handleSubmit(onSubmit)}
              text="Iniciar Sesión"
              isLoading={isLoading}
            />
          </Box>
          {user && (
            <p className="errorText">Usuario o contraseña incorrecta!</p>
          )}
          <Link href="#" className="link">
            Olvidé mi contraseña
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;
