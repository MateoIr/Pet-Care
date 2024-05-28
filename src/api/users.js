import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

const getUserSelected = async (email, password) => {
  try {
    const response = await apiClient.get("/users", {
      params: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    return null;
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
  console.log("puta");
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

export { getUserSelected, registerUser };
export default apiClient;
