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

const getAllPets = async () => {
  try {
    const response = await apiClient.get("/mascota/mascotas");
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

const getPetByOwner = async (idcliente) => {
  try {
    const response = await apiClient.post(
      `/turno/listamascotasporcliente/${idcliente}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllClients = async () => {
  try {
    const response = await apiClient.get("/clientes/list");
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
    console.error("Error registrando mascota:", error);
    throw error;
  }
};

const deletePet = async (id) => {
  try {
    const response = await apiClient.delete(`/mascota/mascota/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar mascota:", error);
    throw error;
  }
};

const deleteClient = async (id) => {
  try {
    const response = await apiClient.delete(`/clientes/cliente/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    throw error;
  }
};

const getPet = async (id) => {
  try {
    const response = await apiClient.get(`/mascota/mascota/${id}`);
    return response.data;
  } catch (error) {
    return error
      .status(400)
      .json({ error: "..Mascota con ese id no encontrado.." });
  }
};
const getClient = async (id) => {
  try {
    const response = await apiClient.post(`/clientes/idcliente`, {
      id,
    });
    return response.data;
  } catch (error) {
    return error
      .status(400)
      .json({ error: "..Cliente con ese id no encontrado.." });
  }
};

const updateClientSelected = async ({
  idcliente,
  idpersona,
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
    const response = await apiClient.post(`/clientes/actualizarcliente`, {
      idcliente,
      idpersona,
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
    return response.data;
  } catch (error) {
    console.log("Entró al catch:", error); // Ver el error completo en consola

    // Puedes devolver el error como un objeto, no usar .status() y .json() en el frontend
    return {
      status: error.response ? error.response.status : 500,
      message:
        error.response && error.response.data
          ? error.response.data.error
          : "Ocurrió un error desconocido.",
    };
  }
};

const updatePetSelected = async ({
  id,
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
    const response = await apiClient.post(`/mascota/actualizarmascota`, {
      id: id,
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
    console.log("Entró al catch:", error); // Ver el error completo en consola

    // Puedes devolver el error como un objeto, no usar .status() y .json() en el frontend
    return {
      status: error.response ? error.response.status : 500,
      message:
        error.response && error.response.data
          ? error.response.data.error
          : "Ocurrió un error desconocido.",
    };
  }
};

export {
  getAllPaises,
  getAllProvincias,
  getAllRace,
  getAllAnimals,
  registerAnimal,
  getAllClients,
  getAllLocalidades,
  getAllCustomers,
  deletePet,
  getAllPets,
  deleteClient,
  updateClientSelected,
  updatePetSelected,
  getClient,
  getPet,
  getPetByOwner,
};
