import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const getAllServices = async ({ id }) => {
  try {
    const response = await apiClient.post(
      `/turno/listatiposervicioportipoturno/${id}`
    );
    return response.data;
  } catch (error) {
    return error
      .status(400)
      .json({ error: "El producto con ese código ya se encuentra registrado" });
  }
};

const getAllServicesList = async () => {
  try {
    const response = await apiClient.get("/turno/listaservicios");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllStates = async () => {
  try {
    const response = await apiClient.get("/turno/listaestadosturnos");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllDservices = async () => {
  try {
    const response = await apiClient.get("/producto/listaproductos");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};
const getAllTurnos = async () => {
  try {
    const response = await apiClient.get(`turno/todos`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getTurn = async (id) => {
  try {
    const response = await apiClient.get(`/turno/idturno/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getTurnServices = async (id) => {
  try {
    const response = await apiClient.get(`/turno/detallesdeturno/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};


const registerTurno = async ({
  date,
  datein,
  dateout,
  pet,
  scheduleFrom,
  scheduleUntil,
  service,
  state,
  typeturno,
}) => {
  try {
    const response = await apiClient.post("/turno/registroturno", {
      fechaturno: date,
      fechaingreso: datein,
      fechaegreso: dateout,
      idmascota: pet,
      horarioturnodesde: scheduleFrom,
      horarioturnohasta: scheduleUntil,
      senia: null,
      idtipoturno: typeturno,
      idestado: state,
      detalleturno: service,
    });
    return response.data;
  } catch (error) {
    console.error("Error registrando turno:", error);
    throw error;
  }
};
const updateCostService = async ({ idtiposervico, precio }) => {
  try {
    const response = await apiClient.post("/turno/actualizarprecioservicio", {
      idtiposervico,
      precio,
    });
    return response.data;
  } catch (error) {
    return error
      .status(500)
      .json({ error: "El ususario con ese correo ya se encuentra registrado" });
  }
};


const updateTurnSelected = async ({
  id,
  date,
  datein,
  dateout,
  pet,
  scheduleFrom,
  scheduleUntil,
  service,
  state,
  typeturno,
}) => {
  try {
    const response = await apiClient.post("/turno/modificarturno", {
      idturno:id,
      fechaturno: date,
      fechaingreso: datein,
      fechaegreso: dateout,
      idmascota: pet,
      horarioturnodesde: scheduleFrom,
      horarioturnohasta: scheduleUntil,
      senia: null,
      idtipoturno: typeturno,
      idestado: state,
      detalleturno:service ,
    });
    return response.data;
  } catch (error) {
    console.error("Error registrando turno:", error);
    throw error;
  }
};


export {
  getAllServices,updateTurnSelected,getTurnServices,getTurn,
  getAllDservices,
  registerTurno,
  getAllTurnos,
  getAllStates,
  getAllServicesList,
  updateCostService,
};

