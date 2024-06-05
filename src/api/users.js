import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const getUserSelected = async (email, password) => {
  const response = "";
  try {
    const persona = {
      email: email.email,
      password: email.password,
    };
    console.log(persona);
    const response = await apiClient.post("/login/ingresar", {
      email: email.email,
      contrasena: email.password,
    });
    return response.data;
  } catch (error) {
    return response
      .status(401)
      .json({ error: "Usuario o contraseña incorrectas" });
  }
};

const registerUser = async ({
  name,
  lastName,
  email,
  phoneNumber,
  birthdate,
  userType,
  password,
}) => {
  try {
    const response = await apiClient.post("/login/registrar", {
      nombre: name,
      apellido: lastName,
      email: email,
      telefono: phoneNumber,
      fechaDeNacimiento: birthdate,
      idTipoUsuario: userType,
      contrasena: password,
    });
    return response.data;
  } catch (error) {
    return error
      .status(500)
      .json({ error: "El ususario con ese correo ya se encuentra registrado" });
  }
};

const updateUserSelected = async ({
  name,
  lastName,
  email,
  phoneNumber,
  birthdate,
  userType,
  password,
}) => {
  try {
    const response = await apiClient.post("/login/modificar", {
      nombre: name,
      apellido: lastName,
      email: email,
      telefono: phoneNumber,
      fechaDeNacimiento: birthdate,
      idTipoUsuario: userType,
      contrasena: password,
    });
    return response.data;
  } catch (error) {
    return error
      .status(500)
      .json({ error: "El ususario con ese correo ya se encuentra registrado" });
  }
};

const registerCustomer = async ({
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
}) => {
  try {
    const response = await apiClient.post("/clientes/registrar", {
      nombre,
      apellido,
      email,
      telefono,
      fechaDeNacimiento: fechadenacimiento,
      barrio,
      piso,
      departamento,
      idProvincia: provincia,
      descripcionLocalidad: localidad,
      calle,
      numCalle,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error
      .status(400)
      .json({ error: "El ususario con ese correo ya se encuentra registrado" });
  }
};

const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/login/usuarios");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};
const getUser = async (id) => {
  try {
    const response = await apiClient.post(`/login/idusuarios`, {
      id,
    });
    return response.data;
  } catch (error) {
    return error
      .status(400)
      .json({ error: "El ususario con ese correo ya se encuentra registrado" });
  }
};

const dropUser = async (id) => {
  try {
    const response = await apiClient.post(`/login/delete`, {
      id,
    });
    return response.data;
  } catch (error) {
    return error
      .status(400)
      .json({ error: "El ususario con ese correo ya se encuentra registrado" });
  }
};

export {
  getUserSelected,
  getUser,
  registerUser,
  getAllUsers,
  registerCustomer,
  updateUserSelected,
  dropUser,
};
export default apiClient;
