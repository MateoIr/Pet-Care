import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

const getUserSelected = async (email, password) => {
  console.log("aca");
  try {
    const response = await apiClient.post("/users", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registrando usuario:", error);
    throw error;
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
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

export { getUserSelected, registerUser, getAllUsers };
export default apiClient;
