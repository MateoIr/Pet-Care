import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

const getAllRace = async () => {
  try {
    const response = await apiClient.get("/race");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllAnimals = async () => {
  try {
    const response = await apiClient.get("/animal");
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
    const response = await apiClient.get("/pais");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllProvincias = async () => {
  try {
    const response = await apiClient.get("/provincias");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getUserAnimal = async (name, animal, sex, owner) => {
  try {
    // tendria que filtrar por los 4 pero solo filtra por el primero

    const response = await apiClient.get("/pet", {
      params: {
        name,
        animal,
        sex,
        owner,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos de mascota:", error);
    return [];
  }
};

const registerAnimal = async ({
  name,
  animal,
  race,
  size,
  weight,
  sex,
  birthdate,
  owner,
}) => {
  try {
    const userAnimal = await getUserAnimal(name, animal, sex, owner);
    if (userAnimal.length === 0) {
      const response = await apiClient.post("/pet", {
        name,
        animal,
        race,
        size,
        weight,
        sex,
        birthdate,
        owner,
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
export {
  getAllPaises,
  getAllProvincias,
  getAllRace,
  getAllAnimals,
  registerAnimal,
  getAllLocalidades,
};
