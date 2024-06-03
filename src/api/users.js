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
    const response = await axios.post("http://localhost:8080/login/ingresar", {
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

const getUserEmail = async (email) => {
  try {
    const response = await apiClient.get("/users", {
      params: {
        email,
      },
    });
    return response.data;
  } catch (error) {
    return [];
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

export { getUserSelected, registerUser, getAllUsers };
export default apiClient;
