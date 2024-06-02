import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const getUserSelected = async (email, password) => {
  try {
    const persona = {
      email: email.email,
      password: email.password,
    };
    console.log(persona);
    const response = await axios.post("http://localhost:8080/login/ingresar", {
      email: email.email,
      password: email.password,
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
  token,
}) => {
  try {
    const userEmails = await getUserEmail(email);
    if (userEmails.length === 0) {
      const response = await apiClient.post("/users", {
        name,
        lastName,
        email,
        phoneNumber,
        birthdate,
        userType,
        password,
        token,
      });
      return response.data;
    } else {
      return { error: "El usuario ya existe." };
    }
  } catch (error) {
    console.error("Error registrando usuario:", error);
    throw error;
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
