import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const registerClinic = async ({
  nombre: nombreClinica,
  calle: calleClinica,
  numCalle: numCalleClinica,
  barrio: barrioClinica,
  departamento: departamentoClinica,
  piso: pisoClinica,
  localidad: descripcionLocalidadClinica,
  provincia: idProvinciaClinica,
}) => {
  try {
    const response = await apiClient.post("/Veterinarios/RegistrarClinica", {
      nombreClinica,
      calleClinica,
      numCalleClinica,
      barrioClinica,
      departamentoClinica,
      pisoClinica,
      descripcionLocalidadClinica,
      idProvinciaClinica,
    });
    return response.data;
  } catch (error) {
    return error
      .status(400)
      .json({ error: "La clinica ha sido creada con anterioridad" });
  }
};

const registerVeterinarian = async ({
  matricula,
  clinics: idClinica,
  nombre,
  apellido,
  fechadenacimiento: fechaDeNacimiento,
  email,
  telefono,
  barrio,
  piso,
  departamento,
  provincia: idProvincia,
  localidad: descripcionLocalidad,
  calle,
  numCalle,
}) => {
  try {
    const response = await apiClient.post("/Veterinarios/registrar", {
      nombre,
      apellido,
      email,
      telefono,
      fechaDeNacimiento,
      barrio,
      piso,
      departamento,
      idProvincia,
      descripcionLocalidad,
      calle,
      numCalle,
      matricula,
      idClinica,
      estado: true,
    });
    return response.data;
  } catch (error) {
    return error.status(400).json({
      error: "El Veterinario con ese correo ya se encuentra registrado",
    });
  }
};

const getAllClinics = async () => {
  try {
    const response = await apiClient.get("/Veterinarios/clinica");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

export { registerClinic, registerVeterinarian, getAllClinics };
