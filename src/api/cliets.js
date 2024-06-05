import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const getAllRace = async () => {
  try {
    const response = await apiClient.get("/mascota/raza");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllCustomers = async () => {
  try {
    const response = await apiClient.get("/clientes/list");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllAnimals = async () => {
  try {
    const response = await apiClient.get("/mascota/animal");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};
const getAllLocalidades = async () => {
  try {
    const response = await apiClient.get("/localidad");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllPaises = async () => {
  try {
    const response = await apiClient.get("/clientes/pais");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllProvincias = async () => {
  try {
    const response = await apiClient.get("/clientes/provincia");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const registerAnimal = async ({
  name,
  animal,
  raza,
  size,
  weight,
  sex,
  birthdate,
  owner,
}) => {
  try {
    const response = await apiClient.post("/mascota/registrar", {
      nombre: name,
      peso: weight,
      fechaDeNacimiento: birthdate,
      idanimal: animal,
      idraza: raza,
      tamano: size,
      sexo: sex,
      idcliente: owner,
    });
    return response.data;
  } catch (error) {
    console.error("Error registrando usuario:", error);
    throw error;
  }
};
export {
  getAllPaises,
  getAllProvincias,
  getAllRace,
  getAllAnimals,
  registerAnimal,
  getAllLocalidades,
  getAllCustomers,
};
