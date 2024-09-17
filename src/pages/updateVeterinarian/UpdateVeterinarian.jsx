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
import useGetSelectedVeterinarian from "../../hooks/veterinarian/useGetSelectedVeterinarian";
import useGetAllClinics from "../../hooks/clinic/useGetAllClinics";
import CustomSelectTectBox2 from "../../components/customSelectTectBox copy/CustomSelectTectBox2";
import { useGetPais, useGetProvincia } from "../../hooks/useUbications";

const UpdateVeterinarian = ({ setUser }) => {
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

  const { clinics } = useGetAllClinics();
  const [county, setCounty] = useState(null);
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const { provincias } = useGetProvincia();
  const { paises } = useGetPais();
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

  const { id } = useParams();
  const { veterinarianSelected, isLoading, error } =
    useGetSelectedVeterinarian(id);

  useEffect(() => {
    if (veterinarianSelected) {
      setValue("name", veterinarianSelected?.idpersona?.nombre || "");
      setValue("lastName", veterinarianSelected?.idpersona?.apellido || "");
      setValue("email", veterinarianSelected?.idpersona?.email || "");
      setValue("phoneNumber", veterinarianSelected?.idpersona?.telefono || "");
      setValue("matricula", veterinarianSelected?.matricula || "");
      setValue("clinica", veterinarianSelected?.idclinica?.id || "");

      setValue(
        "birthdate",
        veterinarianSelected?.idpersona?.fechadenacimiento || ""
      );
      setValue("password", veterinarianSelected?.contrasena || "");
    }
  }, [veterinarianSelected, setValue]);

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
          <Box className="titlePage">Modificar Veterinario</Box>
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
                Matricula:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="matricula"
                />
                <p className="errorText">{errors.matricula?.message}</p>
              </Grid>
              <Grid item xs={6} className="textInput">
                Clinica:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomSelectTectBox2
                  register={register}
                  name="clinics"
                  list={clinics}
                  valueKey="id"
                  labelKey="nombre"
                  selectedItem={veterinarianSelected?.idclinica?.id}
                />
                <p className="errorText">{errors.clinics?.message}</p>
              </Grid>
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
                  selectedItem={
                    veterinarianSelected?.idpersona.iddireccion.idlocalidad
                      .idprovincia.idpais.id
                  }
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
                  selectedItem={
                    veterinarianSelected?.idpersona.iddireccion.idlocalidad
                      .idprovincia.id
                  }
                />
                <p className="errorText">{errors.provincia?.message}</p>
              </Grid>

              <Grid item xs={6} className="textInput">
                Calle:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox type="text" register={register} name="calle" />
                <p className="errorText">{errors.calle?.message}</p>
              </Grid>

              <Grid item xs={6} className="textInput">
                NumeroCalle:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="numCalle"
                />
                <p className="errorText">{errors.numCalle?.message}</p>
              </Grid>
              <Grid item xs={6} className="textInput">
                Departamento:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="departamento"
                />
                <p className="errorText">{errors.departamento?.message}</p>
              </Grid>
              <Grid item xs={6} className="textInput">
                Barrio:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox type="text" register={register} name="barrio" />
                <p className="errorText">{errors.barrio?.message}</p>
              </Grid>
              <Grid item xs={6} className="textInput">
                Piso:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox type="text" register={register} name="piso" />
                <p className="errorText">{errors.piso?.message}</p>
              </Grid>
              <Grid item xs={6} className="textInput">
                Localidad:
              </Grid>
              <Grid item xs={6} md={4}>
                <CustomTextBox
                  type="text"
                  register={register}
                  name="descripcionLocalidad"
                />
                <p className="errorText">
                  {errors.descripcionLocalidad?.message}
                </p>
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

export default UpdateVeterinarian;
